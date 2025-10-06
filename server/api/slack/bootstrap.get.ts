import { fetchSlackBootstrap } from '~~/server/database/queries';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  if (config.databaseUrl && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = config.databaseUrl;
  }

  try {
    const payload = await fetchSlackBootstrap(config.currentUserId);
    return payload;
  } catch (error) {
    console.error('Failed to load Slack bootstrap payload', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load Slack data'
    });
  }
});
