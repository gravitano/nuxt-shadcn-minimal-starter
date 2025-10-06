<script setup lang="ts">
import { computed } from 'vue';
import type { SlackMember, SlackWorkspace } from '@/lib/slack';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const props = defineProps<{
  workspaces: SlackWorkspace[];
  activeWorkspaceId: string;
  currentUser: SlackMember;
}>();

const emit = defineEmits<{
  (e: 'select', workspaceId: string): void;
}>();

const initials = computed(() =>
  Object.fromEntries(
    props.workspaces.map((workspace) => [
      workspace.id,
      workspace.key ||
        workspace.name
          .split(' ')
          .map((piece) => piece.charAt(0))
          .join('')
          .toUpperCase()
    ])
  )
);

const currentUserInitials = computed(() =>
  props.currentUser.name
    .split(' ')
    .map((segment) => segment.charAt(0))
    .join('')
    .toUpperCase()
);
</script>

<template>
  <TooltipProvider :delay-duration="120">
    <aside class="flex h-full w-20 flex-col items-center gap-4 border-r border-border bg-sidebar text-sidebar-foreground">
      <div class="flex flex-col items-center gap-3 py-4">
        <Tooltip v-for="workspace in workspaces" :key="workspace.id">
          <TooltipTrigger as-child>
            <button
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sidebar-primary text-base font-semibold transition-all hover:rounded-xl hover:bg-sidebar-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              :class="{
                'ring-2 ring-primary ring-offset-2 ring-offset-sidebar': workspace.id === activeWorkspaceId
              }"
              type="button"
              @click="emit('select', workspace.id)"
            >
              {{ initials[workspace.id] }}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div class="text-sm font-medium">{{ workspace.name }}</div>
            <p class="text-xs text-muted-foreground">{{ workspace.description }}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div class="mt-auto flex flex-col items-center gap-3 pb-4">
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              type="button"
            >
              <Icon name="mdi:plus" class="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">Add workspace</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger as-child>
            <Avatar class="h-12 w-12 border border-border/40">
              <AvatarFallback :class="[currentUser.avatarColor, 'text-base font-semibold']">
                {{ currentUserInitials }}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div class="text-sm font-medium">{{ currentUser.name }}</div>
            <p class="text-xs text-muted-foreground">{{ currentUser.title }}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  </TooltipProvider>
</template>
