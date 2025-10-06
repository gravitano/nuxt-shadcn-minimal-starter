export type SlackChannelType = 'channel' | 'dm';

export interface SlackWorkspace {
  id: string;
  name: string;
  key: string;
  description: string | null;
  channels: SlackChannel[];
}

export interface SlackMember {
  id: string;
  name: string;
  title: string | null;
  avatarColor: string;
  presence: 'online' | 'away' | 'offline';
  statusIcon?: string | null;
}

export interface SlackChannel {
  id: string;
  workspaceId: string;
  name: string;
  type: SlackChannelType;
  topic?: string | null;
  isStarred: boolean;
  memberIds: string[];
  members?: SlackMember[];
  unreadCount?: number;
  createdAt?: string;
}

export interface SlackMessage {
  id: string;
  channelId: string;
  authorId: string;
  body: string;
  createdAt: string;
  author: SlackMember;
}

export interface SlackBootstrapPayload {
  workspaces: SlackWorkspace[];
  members: SlackMember[];
  currentUserId: string | null;
}
