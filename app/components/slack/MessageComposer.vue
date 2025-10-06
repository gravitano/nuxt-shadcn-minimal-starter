<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SlackChannel } from '@/lib/slack';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const props = defineProps<{
  channel: SlackChannel | undefined;
}>();

const emit = defineEmits<{
  (e: 'submit', payload: { body: string }): void;
}>();

const draft = ref('');

watch(
  () => props.channel?.id,
  () => {
    draft.value = '';
  }
);

function handleSubmit() {
  const trimmed = draft.value.trim();
  if (!trimmed) return;
  emit('submit', { body: trimmed });
  draft.value = '';
}
</script>

<template>
  <form class="space-y-3 border-t border-border bg-background/95 px-6 py-4" @submit.prevent="handleSubmit">
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <p v-if="channel">
        Mengirim ke <span class="font-medium text-foreground">{{ channel.type === 'channel' ? '#' + channel.name : channel.name }}</span>
      </p>
      <p v-else>Pilih channel untuk mulai mengirim pesan.</p>
      <div class="flex items-center gap-3">
        <span>Gunakan <kbd class="rounded border border-border px-1 text-[10px] text-muted-foreground">Shift + Enter</kbd> untuk baris baru</span>
      </div>
    </div>

    <div class="rounded-lg border border-border/80 bg-muted/10 p-3 shadow-sm focus-within:border-primary">
      <Textarea
        v-model="draft"
        rows="3"
        :disabled="!channel"
        placeholder="Tulis pesan untuk tim..."
        class="resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
      />
      <div class="mt-3 flex items-center justify-between">
        <div class="flex items-center gap-2 text-muted-foreground">
          <Button type="button" variant="ghost" size="icon" class="h-8 w-8" :disabled="!channel">
            <Icon name="mdi:paperclip" class="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" class="h-8 w-8" :disabled="!channel">
            <Icon name="mdi:sticker-emoji" class="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" class="h-8 w-8" :disabled="!channel">
            <Icon name="mdi:microphone" class="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit" size="sm" :disabled="!channel || !draft.trim()">
          Kirim
          <Icon name="mdi:send" class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </form>
</template>
