// src/app/api/admin/insert/route.ts
import { NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebaseAdmin';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const initialData = {
  pages: [
    {
      pageId: 'Home',
      url: '/home',
      title: 'Home',
      elements: [
        {
          id: 'hero-01',
          type: 'section',
          backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
          content: [
            {
              fieldId: 'hero-01-title',
              type: 'text',
              maxChar: 30,
              content: 'Markham Cricket Academy',
            },
            {
              fieldId: 'hero-01-subtitle',
              type: 'text',
              maxChar: 60,
              content: 'Transforming Aspirants into Cricket Stars',
            },
            {
              fieldId: 'hero-01-image',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Markham Cricket Academy',
            },
          ],
        },
        {
          id: 'hero-02',
          type: 'section',
          backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
          content: [
            {
              fieldId: 'hero-02-title',
              type: 'text',
              maxChar: 30,
              content: 'Transforming enthusiasts into skilled cricketers through professional coaching and dedication.',
            },
            {
              fieldId: 'hero-02-subtitle',
              type: 'textarea',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.',
            },
            {
              fieldId: 'hero-02-button',
              type: 'button',
              content: 'Learn More',
              link: '/about',
            },
          ],
        },
      ],
    },
    {
      pageId: 'About',
      url: '/about',
      title: 'About',
      elements: [
        {
          id: 'hero-about-01',
          type: 'section',
          backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
          content: [
            {
              fieldId: 'hero-about-01-title',
              type: 'text',
              maxChar: 30,
              content: 'Markham Cricket Academy',
            },
          ],
        },
        {
          id: 'hero-about-02',
          type: 'section',
          content: [
            {
              fieldId: 'hero-about-02-title',
              type: 'text',
              maxChar: 30,
              content: "At MCA, we believe that cricket is more than just a sport - it's a way of life",
            },
            {
              fieldId: 'hero-about-02-paragraph-1', // Fixed typo: "parargraph" to "paragraph"
              type: 'textarea',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna',
            },
            {
              fieldId: 'hero-about-02-paragraph-2',
              type: 'textarea',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna',
            },
            {
              fieldId: 'hero-about-02-paragraph-3',
              type: 'textarea',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna',
            },
          ],
        },
        {
          id: 'academy-stats',
          type: 'section',
          content: [
            {
              fieldId: 'academy-stats-members',
              type: 'number',
              content: 50,
              label: 'Members',
            },
            {
              fieldId: 'academy-stats-coaches',
              type: 'number',
              content: 5,
              label: 'Coaches',
            },
            {
              fieldId: 'academy-stats-years-of-experience',
              type: 'number',
              content: 10,
              label: 'Years of Experience',
            },
            {
              fieldId: 'academy-stats-championships',
              type: 'number',
              content: 3,
              label: 'Championships',
            },
          ],
        },
        {
          id: 'info-section-1',
          type: 'section',
          content: [
            {
              fieldId: 'info-section-1-title',
              type: 'text',
              maxChar: 30,
              content: 'Elevating Passion: Join Our Cricket Training Journey',
            },
            {
              fieldId: 'info-section-1-content',
              type: 'textarea',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna',
            },
            {
              fieldId: 'info-section-1-gallery',
              type: 'gallery',
              max: 6,
              images: [
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              ],
            },
          ],
        },
      ],
    },
  ],
  config: [
    {
      sectionId: 'Header',
      type: 'section',
      elements: [
        {
          fieldId: 'logo',
          type: 'image',
          src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
          alt: 'Markham Cricket Academy',
        },
        {
          fieldId: 'menu',
          type: 'menu',
          contents: [
            {
              fieldId: 'home',
              label: 'Home',
              link: '/home',
            },
            {
              fieldId: 'about',
              label: 'About',
              link: '/about',
            },
            {
              fieldId: 'services',
              label: 'Services',
              link: '/services',
            },
            {
              fieldId: 'contact',
              label: 'Contact',
              link: '/contact',
            },
          ],
        },
        {
          fieldId: 'sponsors',
          type: 'gallery',
          max: 20,
          contents: [
            {
              fieldId: 'sponsor-01',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Sponsor 1',
            },
            {
              fieldId: 'sponsor-02',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Sponsor 2',
            },
            {
              fieldId: 'sponsor-03',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Sponsor 3',
            },
          ],
        },
        {
          fieldId: 'social-media',
          type: 'gallery',
          max: 6,
          contents: [
            {
              fieldId: 'facebook',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Facebook',
            },
            {
              fieldId: 'twitter',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Twitter',
            },
            {
              fieldId: 'instagram',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Instagram',
            },
            {
              fieldId: 'youtube',
              type: 'image',
              src: 'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              alt: 'Youtube',
            },
          ],
        },
        {
          fieldId: 'testimonial',
          type: 'section',
          label: 'Testimonials',
          content: [
            {
              fieldId: 'testimonial-1',
              type: 'text',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.',
              author: 'John Doe',
              date: '2022-01-01',
              rating: 5,
            },
            {
              fieldId: 'testimonial-2',
              type: 'text',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.',
              author: 'Jane Smith',
              date: '2022-02-01',
              rating: 4,
            },
            {
              fieldId: 'testimonial-3',
              type: 'text',
              maxChar: 300,
              content: 'Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.',
              author: 'John Smith',
              date: '2022-03-01',
              rating: 3,
            },
          ],
        },
      ],
    },
  ],
};

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);

    const tempTimestamp = Date.now().toString();
    const initialTimestamp = 'initial-0';

    // Insert pages with temporary version
    for (const page of initialData.pages) {
      const pageRef = db.collection('pages').doc(tempTimestamp).collection(page.pageId).doc('data');
      const pageData: any = {
        url: page.url,
        title: page.title,
        elements: {},
      };
      page.elements.forEach((element) => {
        element.content.forEach((field) => {
          pageData.elements[field.fieldId] = {
            type: field.type,
            content: field.content,
            ...(field.maxChar && { maxChar: field.maxChar }),
            ...(field.src && { src: field.src }),
            ...(field.alt && { alt: field.alt }),
            ...(field.link && { link: field.link }),
            ...(field.label && { label: field.label }),
            ...(field.images && { images: field.images }),
            ...(field.author && { author: field.author }),
            ...(field.date && { date: field.date }),
            ...(field.rating && { rating: field.rating }),
            ...(field.contents && { contents: field.contents }), // For menu, gallery, etc.
          };
        });
      });
      await pageRef.set(pageData);
    }

    // Insert config with temporary version
    for (const config of initialData.config) {
      const configRef = db.collection('config').doc(tempTimestamp).collection(config.sectionId).doc('data');
      const configData: any = {
        type: config.type,
        elements: {},
      };
      config.elements.forEach((element) => {
        configData.elements[element.fieldId] = {
          type: element.type,
          ...(element.content && { content: element.content }),
          ...(element.src && { src: element.src }),
          ...(element.alt && { alt: element.alt }),
          ...(element.label && { label: element.label }),
          ...(element.max && { max: element.max }),
          ...(element.contents && { contents: element.contents }),
          ...(element.author && { author: element.author }),
          ...(element.date && { date: element.date }),
          ...(element.rating && { rating: element.rating }),
        };
      });
      await configRef.set(configData);
    }

    // Initialize meta collection
    await db.collection('meta').doc('pages_latest_version').set({ timestamp: initialTimestamp });
    await db.collection('meta').doc('pages_temp_version').set({ timestamp: tempTimestamp });
    await db.collection('meta').doc('config_temp_version').set({ timestamp: tempTimestamp });

    return NextResponse.json({ message: 'Data inserted successfully', timestamp: tempTimestamp });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}