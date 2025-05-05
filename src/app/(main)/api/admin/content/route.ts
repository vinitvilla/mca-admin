// src/app/(main)/api/admin/content/route.ts
import { NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    if (!pageId) return NextResponse.json({ error: 'pageId required' }, { status: 400 });

    // Fetch meta to determine which version to use
    const metaTempDoc = await db.collection('meta').doc('pages_temp_version').get();
    const tempVersion = metaTempDoc.exists && metaTempDoc.data().timestamp ? metaTempDoc.data().timestamp : null;
    const metaLatestDoc = await db.collection('meta').doc('pages_latest_version').get();
    const latestVersion = metaLatestDoc.exists ? metaLatestDoc.data().timestamp : null;

    let fields = [];
    if (tempVersion) {
      const tempDoc = await db.collection('pages').doc(tempVersion).collection(pageId).doc('data').get();
      fields = tempDoc.exists ? tempDoc.data().elements : [];
    } else if (latestVersion) {
      const latestDoc = await db.collection('pages').doc(latestVersion).collection(pageId).doc('data').get();
      fields = latestDoc.exists ? latestDoc.data().elements : [];
    }

    return NextResponse.json({ latest: latestVersion ? fields : [], temporary: tempVersion ? fields : [] });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const { pageId, fields, action } = await request.json();
    if (!pageId || !fields) return NextResponse.json({ error: 'pageId and fields required' }, { status: 400 });

    if (action === 'save') {
      const tempTimestamp = Date.now().toString();
      const pageData = { elements: {} };
      fields.forEach((field) => {
        pageData.elements[field.fieldId] = {
          type: field.type,
          content: field.content,
          ...(field.maxChar && { maxChar: field.maxChar }),
          ...(field.src && { src: field.src }),
          ...(field.alt && { alt: field.alt }),
          ...(field.link && { link: field.link }),
        };
      });

      // Save to pages/[temp_timestamp]/[pageId]/data
      await db.collection('pages').doc(tempTimestamp).collection(pageId).doc('data').set(pageData, { merge: true });

      // Update meta/config_temp_version
      await db.collection('meta').doc('config_temp_version').set({ timestamp: tempTimestamp }, { merge: true });
      await db.collection('meta').doc('pages_temp_version').set({ timestamp: tempTimestamp }, { merge: true });

      return NextResponse.json({ message: 'Saved to temporary', timestamp: tempTimestamp });
    }

    if (action === 'publish') {
      const tempDoc = await db.collection('meta').doc('pages_temp_version').get();
      const currentTemp = tempDoc.exists && tempDoc.data().timestamp ? tempDoc.data().timestamp : null;
      if (!currentTemp) throw new Error('No temporary version to publish');

      const pageData = { elements: {} };
      fields.forEach((field) => {
        pageData.elements[field.fieldId] = {
          type: field.type,
          content: field.content,
          ...(field.maxChar && { maxChar: field.maxChar }),
          ...(field.src && { src: field.src }),
          ...(field.alt && { alt: field.alt }),
          ...(field.link && { link: field.link }),
        };
      });

      // Save to pages/[currentTemp]/[pageId]/data
      await db.collection('pages').doc(currentTemp).collection(pageId).doc('data').set(pageData, { merge: true });

      // Update meta
      await db.collection('meta').doc('pages_latest_version').set({ timestamp: currentTemp }, { merge: true });
      await db.collection('meta').doc('pages_temp_version').set({ timestamp: null }, { merge: true });

      return NextResponse.json({ message: 'Published', version: currentTemp });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const { pageId } = await request.json();
    if (!pageId) return NextResponse.json({ error: 'pageId required' }, { status: 400 });

    // Clear temporary version
    await db.collection('meta').doc('pages_temp_version').set({ timestamp: null }, { merge: true });
    await db.collection('meta').doc('config_temp_version').set({ timestamp: null }, { merge: true });

    return NextResponse.json({ message: 'Temporary version discarded' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}