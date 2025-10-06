<script setup lang="ts">
import type { SlackChannel, SlackMember } from '@/lib/slack';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  channel: SlackChannel | undefined;
  members: SlackMember[];
}>();

const emit = defineEmits<{
  (e: 'open-channel-details'): void;
}>();
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
    <div class="flex flex-col">
      <div class="flex items-center gap-3">
        <h1 class="text-lg font-semibold">
          <span v-if="channel?.type === 'channel'">#</span>
          {{ channel?.name ?? 'Select a channel' }}
        </h1>
        <span class="text-xs text-muted-foreground">
          {{ channel ? channel.memberIds.length : 0 }}
          member{{ channel && channel.memberIds.length > 1 ? 's' : '' }}
        </span>
      </div>
      <p class="text-sm text-muted-foreground" v-if="channel?.topic">
        {{ channel.topic }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="ghost" size="sm" class="text-muted-foreground" @click="emit('open-channel-details')">
        <Icon name="mdi:information-outline" class="mr-2 h-4 w-4" />
        Lihat detail
      </Button>
      <Button variant="ghost" size="icon" class="text-muted-foreground">
        <Icon name="mdi:magnify" class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" class="text-muted-foreground">
        <Icon name="mdi:cog-outline" class="h-4 w-4" />
      </Button>
    </div>
  </header>
</template>
