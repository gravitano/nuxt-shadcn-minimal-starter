import { H3Error, readValidatedBody } from 'h3';
import { z } from 'zod';
import { insertChannelMessage } from '~~/server/database/queries';

const bodySchema = z.object({
  authorId: z.string().min(1, 'authorId is required'),
  body: z.string().min(1, 'message body is required').max(4000)
});

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

  const payload = await readValidatedBody(event, (data) => bodySchema.parse(data));

  try {
    const message = await insertChannelMessage({
      channelId,
      authorId: payload.authorId,
      body: payload.body
    });

    if (!message) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create message'
      });
    }

    return {
      id: message.id,
      channelId: message.channelId,
      authorId: message.authorId,
      body: message.body,
      createdAt: message.createdAt?.toISOString?.() ?? message.createdAt,
      author: message.author
    };
  } catch (error) {
    if (error instanceof H3Error) {
      throw error;
    }

    console.error(`Failed to create message in channel ${channelId}`, error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create message'
    });
  }
});
