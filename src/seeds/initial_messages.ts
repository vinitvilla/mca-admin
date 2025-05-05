exports.seed = async function(knex: (arg0: string) => { (): any; new(): any; del: { (): any; new(): any; }; insert: { (arg0: { full_name: string; email: string; message: string; created_at: Date; updated_at: Date; }[] | { message_id: number; read_by_user_id: number; read_at: Date; }[]): any; new(): any; }; }) {
  // Clear existing entries
  await knex('message_reads').del();
  await knex('messages').del();

  // Insert sample messages (12 entries)
  await knex('messages').insert([
    {
      full_name: 'John Smith',
      email: 'john.smith@email.com',
      message: 'Hello, I have a question about your services.',
      created_at: new Date('2025-02-25 10:30:00'),
      updated_at: new Date('2025-02-25 10:30:00')
    },
    {
      full_name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      message: 'Technical issue with the website login.',
      created_at: new Date('2025-02-26 14:15:00'),
      updated_at: new Date('2025-02-26 14:15:00')
    },
    {
      full_name: 'Michael Chen',
      email: 'm.chen@email.com',
      message: 'Requesting pricing plan details.',
      created_at: new Date('2025-02-27 09:45:00'),
      updated_at: new Date('2025-02-27 09:45:00')
    },
    {
      full_name: 'Emily Davis',
      email: 'emily.davis@email.com',
      message: 'How do I reset my password?',
      created_at: new Date('2025-02-28 16:20:00'),
      updated_at: new Date('2025-02-28 16:20:00')
    },
    {
      full_name: 'Robert Wilson',
      email: 'r.wilson@email.com',
      message: 'Interested in your premium subscription.',
      created_at: new Date('2025-03-01 11:10:00'),
      updated_at: new Date('2025-03-01 11:10:00')
    },
    {
      full_name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      message: 'Payment processing error occurred.',
      created_at: new Date('2025-03-01 13:25:00'),
      updated_at: new Date('2025-03-01 13:25:00')
    },
    {
      full_name: 'David Martinez',
      email: 'david.m@email.com',
      message: 'Can you add more payment options?',
      created_at: new Date('2025-03-02 09:15:00'),
      updated_at: new Date('2025-03-02 09:15:00')
    },
    {
      full_name: 'Jennifer Brown',
      email: 'jen.brown@email.com',
      message: 'Feature request: Dark mode support.',
      created_at: new Date('2025-03-02 15:40:00'),
      updated_at: new Date('2025-03-02 15:40:00')
    },
    {
      full_name: 'Thomas Lee',
      email: 't.lee@email.com',
      message: 'When will the new version launch?',
      created_at: new Date('2025-03-03 10:55:00'),
      updated_at: new Date('2025-03-03 10:55:00')
    },
    {
      full_name: 'Rachel Patel',
      email: 'rachel.p@email.com',
      message: 'Having trouble uploading files.',
      created_at: new Date('2025-03-03 14:30:00'),
      updated_at: new Date('2025-03-03 14:30:00')
    },
    {
      full_name: 'William Turner',
      email: 'will.t@email.com',
      message: 'Cancel my subscription please.',
      created_at: new Date('2025-03-04 08:20:00'),
      updated_at: new Date('2025-03-04 08:20:00')
    },
    {
      full_name: 'Kelly White',
      email: 'kelly.w@email.com',
      message: 'Need help with account recovery.',
      created_at: new Date('2025-03-05 11:35:00'),
      updated_at: new Date('2025-03-05 11:35:00')
    }
  ]);

  // Insert sample message reads (15 entries)
  await knex('message_reads').insert([
    { message_id: 1, read_by_user_id: 101, read_at: new Date('2025-02-25 11:00:00') },
    { message_id: 1, read_by_user_id: 102, read_at: new Date('2025-02-25 11:05:00') },
    { message_id: 2, read_by_user_id: 101, read_at: new Date('2025-02-26 15:30:00') },
    { message_id: 3, read_by_user_id: 103, read_at: new Date('2025-02-27 10:15:00') },
    { message_id: 4, read_by_user_id: 102, read_at: new Date('2025-02-28 16:45:00') },
    { message_id: 4, read_by_user_id: 104, read_at: new Date('2025-02-28 17:00:00') },
    { message_id: 5, read_by_user_id: 101, read_at: new Date('2025-03-01 11:30:00') },
    { message_id: 6, read_by_user_id: 103, read_at: new Date('2025-03-01 14:00:00') },
    { message_id: 7, read_by_user_id: 102, read_at: new Date('2025-03-02 09:45:00') },
    { message_id: 8, read_by_user_id: 101, read_at: new Date('2025-03-02 16:00:00') },
    { message_id: 8, read_by_user_id: 104, read_at: new Date('2025-03-02 16:10:00') },
    { message_id: 9, read_by_user_id: 103, read_at: new Date('2025-03-03 11:20:00') },
    { message_id: 10, read_by_user_id: 102, read_at: new Date('2025-03-03 15:00:00') },
    { message_id: 11, read_by_user_id: 101, read_at: new Date('2025-03-04 08:45:00') },
    { message_id: 12, read_by_user_id: 104, read_at: new Date('2025-03-05 12:00:00') }
  ]);
};