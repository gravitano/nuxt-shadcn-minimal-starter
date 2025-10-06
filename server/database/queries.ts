import { asc, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { useDb, schema } from './index';

export async function fetchSlackBootstrap(currentUserId?: string) {
  const db = useDb();

  const [workspaceRows, memberRows] = await Promise.all([
    db.query.workspaces.findMany({
      orderBy: (workspaces, { asc }) => asc(workspaces.name),
      with: {
        channels: {
          orderBy: (channels, { asc }) => asc(channels.name),
          with: {
            members: {
              with: {
                member: true
              }
            }
          }
        }
      }
    }),
    db.select().from(schema.members).orderBy(asc(schema.members.name))
  ]);

  const membersById = new Map(memberRows.map((member) => [member.id, member]));

  const workspaces = workspaceRows.map((workspace) => ({
    ...workspace,
    channels: workspace.channels.map((channel) => ({
      ...channel,
      memberIds: channel.members.map((member) => member.memberId),
      members: channel.members
        .map((member) => membersById.get(member.memberId))
        .filter(Boolean),
      unreadCount: 0
    }))
  }));

  const fallbackUserId = memberRows[0]?.id;
  const userId = currentUserId && membersById.has(currentUserId) ? currentUserId : fallbackUserId;

  return {
    workspaces,
    members: memberRows,
    currentUserId: userId ?? null
  };
}

export async function fetchChannelMessages(channelId: string) {
  const db = useDb();

  return db.query.messages.findMany({
    where: eq(schema.messages.channelId, channelId),
    orderBy: (messages, { asc }) => asc(messages.createdAt),
    with: {
      author: true
    }
  });
}

export async function insertChannelMessage(options: {
  channelId: string;
  authorId: string;
  body: string;
}) {
  const db = useDb();
  const messageId = `msg-${randomUUID()}`;

  await db
    .insert(schema.messages)
    .values({
      id: messageId,
      channelId: options.channelId,
      authorId: options.authorId,
      body: options.body
    })
    .returning();

  const message = await db.query.messages.findFirst({
    where: eq(schema.messages.id, messageId),
    with: {
      author: true
    }
  });

  return message;
}
