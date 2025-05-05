import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('page_content').del();

  await knex('page_content').insert([
    { pageId: 'home', fieldId: 'title', content: 'Welcome to Cricket Academy', contentType: 'text', maxChar: 100, required: true, version: 'version-123456789' },
    { pageId: 'home', fieldId: 'description', content: 'Join our top-tier program', contentType: 'text', maxChar: 500, required: false, version: 'version-123456789' },
    { pageId: 'about', fieldId: 'title', content: 'About Us', contentType: 'text', maxChar: 100, required: true, version: 'version-123456789' },
    { pageId: 'contact', fieldId: 'title', content: 'Contact Us', contentType: 'text', maxChar: 100, required: true, version: 'version-123456789' },
  ]);
}