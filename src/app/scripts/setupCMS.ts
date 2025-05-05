import { db } from '@/lib/firebaseAdmin'; // Use firebase-admin for server-side access

const data = {
  pages: [
    {
      name: "Home",
      url: "/home",
      title: "Home",
      elements: [
        {
          id: "hero-01",
          type: "section",
          backgroundImage: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
          content: [
            {
              id: "hero-01-title",
              type: "text",
              maxChar: 30,
              content: "Markham Cricket Academy"
            },
            {
              id: "hero-01-subtitle",
              type: "text",
              maxChar: 60,
              content: "Transforming Aspirants into Cricket Stars"
            },
            {
              id: "hero-01-image",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Markham Cricket Academy"
            }
          ]
        },
        {
          id: "hero-02",
          type: "section",
          backgroundImage: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
          content: [
            {
              id: "hero-02-title",
              type: "text",
              maxChar: 30,
              content: "Transforming enthusiasts into skilled cricketers through professional coaching and dedication."
            },
            {
              id: "hero-02-subtitle",
              type: "textarea",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo."
            },
            {
              id: "hero-02-button",
              type: "button",
              content: "Learn More",
              link: "/about"
            }
          ]
        }
      ]
    },
    {
      name: "About",
      url: "/about",
      title: "About",
      elements: [
        {
          id: "hero-about-01",
          type: "section",
          backgroundImage: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
          content: [
            {
              id: "hero-about-01-title",
              type: "text",
              maxChar: 30,
              content: "Markham Cricket Academy"
            }
          ]
        },
        {
          id: "hero-about-02",
          type: "section",
          content: [
            {
              id: "hero-about-02-title",
              type: "text",
              maxChar: 30,
              content: "At MCA, we believe that cricket is more than just a sport - it's a way of life"
            },
            {
              id: "hero-about-02-parargraph-1",
              type: "textarea",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna"
            },
            {
              id: "hero-about-02-parargraph-2",
              type: "textarea",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna"
            },
            {
              id: "hero-about-02-parargraph-3",
              type: "textarea",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna"
            }
          ]
        },
        {
          id: "academy-stats",
          type: "section",
          content: [
            {
              id: "academy-stats-members",
              type: "number",
              content: 50,
              label: "Members"
            },
            {
              id: "academy-stats-coaches",
              type: "number",
              content: 5,
              label: "Coaches"
            },
            {
              id: "academy-stats-years-of-experience",
              type: "number",
              content: 10,
              label: "Years of Experience"
            },
            {
              id: "academy-stats-championships",
              type: "number",
              content: 3,
              label: "Championships"
            }
          ]
        },
        {
          id: "info-section-1",
          type: "section",
          content: [
            {
              id: "info-section-1-title",
              type: "text",
              maxChar: 30,
              content: "Elevating Passion: Join Our Cricket Training Journey"
            },
            {
              id: "info-section-1-content",
              type: "textarea",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna"
            },
            {
              id: "info-section-1-gallery",
              type: "gallery",
              max: 6,
              images: [
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
                'https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7',
              ]
            }
          ]
        }
      ]
    }
  ],
  config: [
    {
      name: "Header",
      type: "section",
      elements: [
        {
          id: "logo",
          type: "image",
          src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
          alt: "Markham Cricket Academy"
        },
        {
          id: "menu",
          type: "menu",
          contents: [
            {
              id: "home",
              label: "Home",
              link: "/home"
            },
            {
              id: "about",
              label: "About",
              link: "/about"
            },
            {
              id: "services",
              label: "Services",
              link: "/services"
            },
            {
              id: "contact",
              label: "Contact",
              link: "/contact"
            }
          ]
        },
        {
          id: "sponsors",
          type: "gallery",
          max: 20,
          contents: [
            {
              id: "sponsor-01",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Sponsor 1"
            },
            {
              id: "sponsor-02",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Sponsor 2"
            },
            {
              id: "sponsor-03",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Sponsor 3"
            }
          ]
        },
        {
          id: "social-media",
          type: "gallery",
          max: 6,
          contents: [
            {
              id: "facebook",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Facebook"
            },
            {
              id: "twitter",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Twitter"
            },
            {
              id: "instagram",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Instagram"
            },
            {
              id: "youtube",
              type: "image",
              src: "https://firebasestorage.googleapis.com/v0/b/markham-cricket-academy-69.firebasestorage.app/o/players%2F1741515122553_virat.jpg?alt=media&token=d6cb7a6d-cefb-4c01-b1be-2971e3d5ebb7",
              alt: "Youtube"
            }
          ]
        },
        {
          id: "testimonial",
          type: "section",
          label: "Testimonials",
          content: [
            {
              id: "testimonial-1",
              type: "text",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.",
              author: "John Doe",
              date: "2022-01-01",
              rating: 5
            },
            {
              id: "testimonial-2",
              type: "text",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.",
              author: "Jane Smith",
              date: "2022-02-01",
              rating: 4
            },
            {
              id: "testimonial-3",
              type: "text",
              maxChar: 300,
              content: "Lorem ipsum dolor sit amet consectetur. Et ante imperdiet porttitor vulputate id. Ultrices id lectus lectus consequat porttitor lobortis. Morbi sit nunc eleifend magna ornare enim. Non malesuada amet pulvinar mus. Diam massa ac eget mauris. Mi ut enim in egestas massa. Bibendum nec rutrum sed commodo.",
              author: "John Smith",
              date: "2022-03-01",
              rating: 3
            }
          ]
        }
      ]
    }
  ]
};

export const insertData = async () => {
  try {
    const tempTimestamp = Date.now().toString();
    const initialTimestamp = 'initial-0';

    // Insert pages with temporary version
    for (const page of data.pages) {
      // const pageRef = db.collection('pages')?.doc(tempTimestamp)?.collection(page.pageId);
      // const pageData: any = {
      //   url: page.url,
      //   title: page.title,
      //   elements: {},
      // };
      // page.elements.forEach((element) => {
      //   element.content.forEach((field) => {
      //     pageData.elements[field.fieldId] = {
      //       type: field.type,
      //       content: field.content,
      //       ...(field.maxChar && { maxChar: field.maxChar }),
      //       ...(field.src && { src: field.src }),
      //       ...(field.alt && { alt: field.alt }),
      //       ...(field.link && { link: field.link }),
      //     };
      //   });
      // });
      // await pageRef.doc('data').set(pageData); // Use a single document under the collection
    }

    // Insert config with temporary version
    // for (const config of data.config) {
    //   const configRef = db.collection('config').doc(tempTimestamp)?.collection(config.sectionId);
    //   const configData: any = {
    //     type: config.type,
    //     elements: {},
    //   };
    //   config.elements.forEach((element) => {
    //     configData.elements[element.fieldId] = {
    //       type: element.type,
    //       content: element.content || element.src,
    //       ...(element.maxChar && { maxChar: element.maxChar }),
    //       ...(element.src && { src: element.src }),
    //       ...(element.alt && { alt: element.alt }),
    //       ...(element.link && { link: element.link }),
    //     };
    //   });
    //   await configRef.doc('data').set(configData); // Use a single document under the collection
    // }

    // Initialize meta collection
    // await db.collection('meta').doc('pages_latest_version').set({ timestamp: initialTimestamp });
    // await db.collection('meta').doc('pages_temp_version').set({ timestamp: tempTimestamp });
    // await db.collection('meta').doc('config_temp_version').set({ timestamp: tempTimestamp });

    console.log('Data inserted successfully with temporary version and initial meta setup');
  } catch (error) {
    console.error('Error inserting data: ', error);
  }
};