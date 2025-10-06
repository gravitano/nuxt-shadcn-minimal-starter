import { useDb, schema } from '../server/database';

async function seed() {
  const db = useDb();

  await db.transaction(async (tx) => {
    await tx.delete(schema.messages);
    await tx.delete(schema.channelMembers);
    await tx.delete(schema.channels);
    await tx.delete(schema.members);
    await tx.delete(schema.workspaces);

    await tx.insert(schema.workspaces).values([
      {
        id: 'ws-nuxt-labs',
        name: 'Nuxt Labs',
        key: 'NL',
        description: 'Internal workspace for Nuxt Slack clone demo.'
      },
      {
        id: 'ws-design-co',
        name: 'Design Co-op',
        key: 'DC',
        description: 'Shared workspace for design partners.'
      }
    ]);

    await tx.insert(schema.members).values([
      {
        id: 'mem-01',
        name: 'Ayu Pratama',
        title: 'Product Designer',
        avatarColor: 'bg-emerald-500',
        statusIcon: 'mdi:palette',
        presence: 'online'
      },
      {
        id: 'mem-02',
        name: 'Bima Santoso',
        title: 'Frontend Engineer',
        avatarColor: 'bg-indigo-500',
        statusIcon: 'mdi:code-braces',
        presence: 'online'
      },
      {
        id: 'mem-03',
        name: 'Clara Wijaya',
        title: 'Engineering Manager',
        avatarColor: 'bg-rose-500',
        presence: 'away'
      },
      {
        id: 'mem-04',
        name: 'Dimas Bahruna',
        title: 'QA Analyst',
        avatarColor: 'bg-amber-500',
        presence: 'offline'
      }
    ]);

    await tx.insert(schema.channels).values([
      {
        id: 'ch-general',
        workspaceId: 'ws-nuxt-labs',
        name: 'general',
        type: 'channel',
        topic: 'All company announcements and workstream updates.',
        isStarred: false
      },
      {
        id: 'ch-dev-sync',
        workspaceId: 'ws-nuxt-labs',
        name: 'dev-sync',
        type: 'channel',
        topic: 'Daily standup notes and release coordination.',
        isStarred: true
      },
      {
        id: 'ch-design-lounge',
        workspaceId: 'ws-nuxt-labs',
        name: 'design-lounge',
        type: 'channel',
        topic: 'Design critiques and component reviews.',
        isStarred: false
      },
      {
        id: 'dm-ayu-bima',
        workspaceId: 'ws-nuxt-labs',
        name: 'Ayu & Bima',
        type: 'dm',
        isStarred: false
      },
      {
        id: 'ch-design-lounge-dc',
        workspaceId: 'ws-design-co',
        name: 'design-lounge',
        type: 'channel',
        topic: 'Shared experiments with the design collective.',
        isStarred: false
      }
    ]);

    await tx.insert(schema.channelMembers).values([
      { channelId: 'ch-general', memberId: 'mem-01' },
      { channelId: 'ch-general', memberId: 'mem-02' },
      { channelId: 'ch-general', memberId: 'mem-03' },
      { channelId: 'ch-general', memberId: 'mem-04' },
      { channelId: 'ch-dev-sync', memberId: 'mem-01' },
      { channelId: 'ch-dev-sync', memberId: 'mem-02' },
      { channelId: 'ch-dev-sync', memberId: 'mem-03' },
      { channelId: 'ch-design-lounge', memberId: 'mem-01' },
      { channelId: 'ch-design-lounge', memberId: 'mem-02' },
      { channelId: 'dm-ayu-bima', memberId: 'mem-01' },
      { channelId: 'dm-ayu-bima', memberId: 'mem-02' },
      { channelId: 'ch-design-lounge-dc', memberId: 'mem-01' },
      { channelId: 'ch-design-lounge-dc', memberId: 'mem-02' },
      { channelId: 'ch-design-lounge-dc', memberId: 'mem-03' }
    ]);

    await tx.insert(schema.messages).values([
      {
        id: 'msg-01',
        channelId: 'ch-general',
        authorId: 'mem-03',
        body: 'Selamat datang di workspace baru untuk eksperimen Nuxt + shadcn! 🎉'
      },
      {
        id: 'msg-02',
        channelId: 'ch-general',
        authorId: 'mem-02',
        body: 'Aku sudah porting Tailwind token supaya gampang dipakai di komponen sidebar.'
      },
      {
        id: 'msg-03',
        channelId: 'ch-general',
        authorId: 'mem-01',
        body: 'Great! Aku akan update dokumentasi AGENTS.md supaya agent lain gampang lanjut.'
      },
      {
        id: 'msg-04',
        channelId: 'ch-dev-sync',
        authorId: 'mem-02',
        body: 'Update hari ini: SSR layout siap, tinggal wiring message composer.'
      },
      {
        id: 'msg-05',
        channelId: 'ch-dev-sync',
        authorId: 'mem-03',
        body: 'Pastikan aksesibilitas tombol utama sudah dicek ya.'
      },
      {
        id: 'msg-06',
        channelId: 'ch-design-lounge',
        authorId: 'mem-01',
        body: 'Aku share prototipe baru untuk composer, mohon feedback sebelum jam 5 sore.'
      },
      {
        id: 'msg-07',
        channelId: 'ch-design-lounge',
        authorId: 'mem-02',
        body: 'Looks good! Aku paling suka shortcut block buat code snippet.'
      }
    ]);
  });
}

seed()
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
  });
