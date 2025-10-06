import { fetchChannelMessages } from '~~/server/database/queries';

export default defineEventHandler(async (event) => {
  const channelId = event.context.params?.channelId;

  if (!channelId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Channel id is required'
    });
  }

  const config = useRuntimeConfig(event);

  if (config.databaseUrl && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = config.databaseUrl;
  }

  try {
    const rows = await fetchChannelMessages(channelId);

    return rows.map((row) => ({
      id: row.id,
      channelId: row.channelId,
      authorId: row.authorId,
      body: row.body,
      createdAt: row.createdAt?.toISOString?.() ?? row.createdAt,
      author: row.author
    }));
  } catch (error) {
    console.error(`Failed to load messages for channel ${channelId}`, error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load messages'
    });
  }
});
