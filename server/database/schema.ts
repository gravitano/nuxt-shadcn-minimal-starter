import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const channelTypeEnum = pgEnum('channel_type', ['channel', 'dm']);
export const presenceEnum = pgEnum('member_presence', ['online', 'away', 'offline']);

export const workspaces = pgTable('workspaces', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  key: varchar('key', { length: 8 }).notNull(),
  description: text('description').default(''),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const members = pgTable('members', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  title: varchar('title', { length: 120 }).default(''),
  avatarColor: varchar('avatar_color', { length: 32 }).notNull(),
  statusIcon: varchar('status_icon', { length: 64 }),
  presence: presenceEnum('presence').default('offline').notNull()
});

export const channels = pgTable('channels', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 80 }).notNull(),
  type: channelTypeEnum('type').notNull(),
  topic: text('topic'),
  isStarred: boolean('is_starred').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const channelMembers = pgTable(
  'channel_members',
  {
    channelId: text('channel_id')
      .notNull()
      .references(() => channels.id, { onDelete: 'cascade' }),
    memberId: text('member_id')
      .notNull()
      .references(() => members.id, { onDelete: 'cascade' }),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.channelId, table.memberId] })
  })
);

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  channelId: text('channel_id')
    .notNull()
    .references(() => channels.id, { onDelete: 'cascade' }),
  authorId: text('author_id')
    .notNull()
    .references(() => members.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  channels: many(channels)
}));

export const membersRelations = relations(members, ({ many }) => ({
  channelMemberships: many(channelMembers),
  messages: many(messages)
}));

export const channelsRelations = relations(channels, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [channels.workspaceId],
    references: [workspaces.id]
  }),
  members: many(channelMembers),
  messages: many(messages)
}));

export const channelMembersRelations = relations(channelMembers, ({ one }) => ({
  channel: one(channels, {
    fields: [channelMembers.channelId],
    references: [channels.id]
  }),
  member: one(members, {
    fields: [channelMembers.memberId],
    references: [members.id]
  })
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id]
  }),
  author: one(members, {
    fields: [messages.authorId],
    references: [members.id]
  })
}));
