// seeds/initial_pages.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Clear the table first to avoid duplicates
  await knex('pages').del();

  // Insert seed data
  await knex('pages').insert([
    {
      pageId: 'home',
      title: 'Home Page',
      description: 'Main landing page for the cricket academy',
    },
    {
      pageId: 'about',
      title: 'About Us',
      description: 'Information about the academy and its mission',
    },
    {
      pageId: 'contact',
      title: 'Contact Us',
      description: 'Contact form and details for inquiries',
    },
  ]);
}