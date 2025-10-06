<script setup lang="ts">
import { computed } from 'vue';
import type { SlackMember, SlackMessage } from '@/lib/slack';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps<{
  messages: SlackMessage[];
  members: SlackMember[];
  currentUserId: string;
}>();

const memberMap = computed<Record<string, SlackMember>>(() => {
  const entries = new Map<string, SlackMember>();

  props.members.forEach((member) => {
    entries.set(member.id, member);
  });

  props.messages.forEach((message) => {
    entries.set(message.author.id, message.author);
  });

  return Object.fromEntries(entries);
});

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit'
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  day: 'numeric'
});

const groupedMessages = computed(() => {
  return props.messages.reduce((acc, message) => {
    const dateKey = dateFormatter.format(new Date(message.createdAt));
    if (!acc[dateKey]) {
      acc[dateKey] = [] as SlackMessage[];
    }
    acc[dateKey].push(message);
    return acc;
  }, {} as Record<string, SlackMessage[]>);
});

function getInitials(memberId: string) {
  const member = memberMap.value[memberId];
  if (!member) return '?';
  return member.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

function isOwnMessage(authorId: string) {
  return authorId === props.currentUserId;
}
</script>

<template>
  <ScrollArea class="flex-1">
    <div class="space-y-8 py-6">
      <template v-for="(messageGroup, day) in groupedMessages" :key="day">
        <div class="mx-auto flex max-w-2xl items-center gap-3 text-xs text-muted-foreground">
          <div class="h-px flex-1 bg-border" />
          <span>{{ day }}</span>
          <div class="h-px flex-1 bg-border" />
        </div>

        <div class="space-y-4 px-6">
          <article v-for="message in messageGroup" :key="message.id" class="flex gap-3">
            <Avatar class="mt-0.5 h-10 w-10 border border-border/60">
              <AvatarFallback :class="[memberMap[message.authorId]?.avatarColor ?? 'bg-muted', 'text-sm font-semibold']">
                {{ getInitials(message.authorId) }}
              </AvatarFallback>
            </Avatar>
            <div class="flex-1 space-y-2">
              <header class="flex items-baseline gap-2">
                <h3 class="font-semibold text-sm text-foreground">
                  {{ memberMap[message.authorId]?.name ?? 'Unknown' }}
                </h3>
                <span class="text-xs text-muted-foreground">
                  {{ timeFormatter.format(new Date(message.createdAt)) }}
                </span>
                <Badge v-if="isOwnMessage(message.authorId)" variant="secondary" class="ml-1 h-5 px-1.5 text-[10px] uppercase">
                  kamu
                </Badge>
              </header>
              <p class="whitespace-pre-line text-sm text-foreground">
                {{ message.body }}
              </p>

              <div v-if="message.attachments?.length" class="space-y-2">
                <a
                  v-for="attachment in message.attachments"
                  :key="attachment.id"
                  :href="attachment.href ?? '#'"
                  class="block rounded-md border border-border/60 bg-muted/30 px-4 py-3 text-sm transition-colors hover:bg-muted/50"
                >
                  <p class="font-medium">{{ attachment.title }}</p>
                  <p v-if="attachment.description" class="text-xs text-muted-foreground">{{ attachment.description }}</p>
                </a>
              </div>

              <div v-if="message.reactions?.length" class="flex flex-wrap gap-2">
                <button
                  v-for="reaction in message.reactions"
                  :key="reaction.emoji"
                  class="flex items-center gap-1 rounded-full border border-border/80 px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                  type="button"
                >
                  <span>{{ reaction.emoji }}</span>
                  <span>{{ reaction.count }}</span>
                  <span v-if="reaction.reactedByCurrentUser" class="text-[11px] text-primary">you</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </template>
    </div>
  </ScrollArea>
</template>
