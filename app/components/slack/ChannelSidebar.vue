<script setup lang="ts">
import { computed } from 'vue';
import type { SlackChannel, SlackMember } from '@/lib/slack';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const props = defineProps<{
  channels: SlackChannel[];
  members: SlackMember[];
  activeChannelId: string;
  workspaceName: string;
}>();

const emit = defineEmits<{
  (e: 'select', channelId: string): void;
}>();

const memberMap = computed(() =>
  Object.fromEntries(props.members.map((member) => [member.id, member]))
);

const groupedChannels = computed(() => {
  const base = {
    channels: [] as SlackChannel[],
    dms: [] as SlackChannel[]
  };

  return props.channels.reduce((acc, channel) => {
    if (channel.type === 'channel') {
      acc.channels.push(channel);
    } else {
      acc.dms.push(channel);
    }
    return acc;
  }, base);
});

function getDmLabel(channel: SlackChannel) {
  const otherMembers = channel.memberIds
    .map((id) => memberMap.value[id])
    .filter(Boolean);

  if (otherMembers.length === 2) {
    return otherMembers
      .map((member) => member.name.split(' ')[0])
      .join(', ');
  }

  return otherMembers[0]?.name ?? channel.name;
}

function presenceColor(presence: SlackMember['presence']) {
  if (presence === 'online') return 'bg-emerald-500';
  if (presence === 'away') return 'bg-amber-500';
  return 'bg-muted-foreground/40';
}
</script>

<template>
  <aside class="flex h-full w-72 flex-col border-r border-border bg-muted/30">
    <header class="flex items-center justify-between px-4 py-4">
      <div>
        <p class="font-semibold leading-tight text-sm">{{ workspaceName }}</p>
        <p class="text-xs text-muted-foreground">Slack clone prototype</p>
      </div>
      <Button size="icon" variant="ghost" class="h-8 w-8 text-muted-foreground">
        <Icon name="mdi:plus" class="h-4 w-4" />
      </Button>
    </header>

    <div class="px-4 pb-3">
      <div class="relative">
        <Icon name="mdi:magnify" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Cari channel atau DM"
          class="w-full rounded-md border border-transparent bg-sidebar/30 pl-10 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border focus:border-primary focus:outline-none"
        />
      </div>
    </div>

    <Separator />

    <ScrollArea class="flex-1">
      <nav class="space-y-6 px-3 py-4">
        <section>
          <div class="mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-wide text-muted-foreground">
            <span>Channels</span>
            <button class="rounded p-1 text-muted-foreground hover:text-foreground" type="button">
              <Icon name="mdi:plus" class="h-3.5 w-3.5" />
            </button>
          </div>
          <ul class="space-y-1">
            <li v-for="channel in groupedChannels.channels" :key="channel.id">
              <button
                class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar/50"
                :class="{
                  'bg-sidebar/70 text-foreground': channel.id === activeChannelId,
                  'text-muted-foreground': channel.id !== activeChannelId
                }"
                type="button"
                @click="emit('select', channel.id)"
              >
                <div class="flex items-center gap-2">
                  <Icon name="mdi:pound" class="h-3.5 w-3.5" />
                  <span class="capitalize">{{ channel.name.replace(/-/g, ' ') }}</span>
                  <Icon
                    v-if="channel.isStarred"
                    name="mdi:star"
                    class="h-3.5 w-3.5 text-amber-400"
                  />
                </div>
                <Badge v-if="channel.unreadCount" variant="default" class="ml-2 h-5 min-w-6 justify-center px-1 text-xs">
                  {{ channel.unreadCount }}
                </Badge>
              </button>
            </li>
          </ul>
        </section>

        <section v-if="groupedChannels.dms.length">
          <div class="mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-wide text-muted-foreground">
            <span>Direct Messages</span>
            <button class="rounded p-1 text-muted-foreground hover:text-foreground" type="button">
              <Icon name="mdi:pencil" class="h-3.5 w-3.5" />
            </button>
          </div>
          <ul class="space-y-1">
            <li v-for="channel in groupedChannels.dms" :key="channel.id">
              <button
                class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar/50"
                :class="{
                  'bg-sidebar/70 text-foreground': channel.id === activeChannelId,
                  'text-muted-foreground': channel.id !== activeChannelId
                }"
                type="button"
                @click="emit('select', channel.id)"
              >
                <div class="flex items-center gap-3">
                  <Avatar class="h-6 w-6 border border-border/60">
                    <AvatarFallback :class="[memberMap[channel.memberIds[0]]?.avatarColor ?? 'bg-muted', 'text-xs font-semibold']">
                      {{ memberMap[channel.memberIds[0]]?.name.charAt(0) ?? '?' }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="flex items-center gap-2">
                    <span>{{ getDmLabel(channel) }}</span>
                    <span class="relative inline-flex h-2.5 w-2.5">
                      <span :class="['absolute inset-0 rounded-full', presenceColor(memberMap[channel.memberIds[0]]?.presence ?? 'offline')]" />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </ScrollArea>
  </aside>
</template>
