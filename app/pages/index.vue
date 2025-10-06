<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useHead } from '#imports';
import type {
  SlackBootstrapPayload,
  SlackChannel,
  SlackMember,
  SlackMessage,
  SlackWorkspace
} from '@/lib/slack';
import WorkspaceSidebar from '@/components/slack/WorkspaceSidebar.vue';
import ChannelSidebar from '@/components/slack/ChannelSidebar.vue';
import ChatHeader from '@/components/slack/ChatHeader.vue';
import MessageList from '@/components/slack/MessageList.vue';
import MessageComposer from '@/components/slack/MessageComposer.vue';

useHead({
  title: 'Nuxt Slack Clone',
  meta: [
    { name: 'description', content: 'Prototype Slack clone built with Nuxt 4 and shadcn-vue' }
  ]
});

const { data: bootstrapData } = await useAsyncData(
  'slack-bootstrap',
  () => $fetch<SlackBootstrapPayload>('/api/slack/bootstrap')
);

const workspaces = computed<SlackWorkspace[]>(() => bootstrapData.value?.workspaces ?? []);
const members = computed<SlackMember[]>(() => bootstrapData.value?.members ?? []);
const currentUserId = computed(() => bootstrapData.value?.currentUserId ?? null);

const activeWorkspaceId = ref<string>('');
const activeChannelId = ref<string>('');

watch(
  workspaces,
  (workspaceList) => {
    if (!workspaceList.length) {
      activeWorkspaceId.value = '';
      return;
    }

    if (!workspaceList.some((workspace) => workspace.id === activeWorkspaceId.value)) {
      activeWorkspaceId.value = workspaceList[0].id;
    }
  },
  { immediate: true }
);

const currentWorkspace = computed(() =>
  workspaces.value.find((workspace) => workspace.id === activeWorkspaceId.value)
);

const workspaceChannels = computed(() => currentWorkspace.value?.channels ?? []);

watch(
  workspaceChannels,
  (channels) => {
    if (!channels.length) {
      activeChannelId.value = '';
      return;
    }

    if (!channels.some((channel) => channel.id === activeChannelId.value)) {
      activeChannelId.value = channels[0].id;
    }
  },
  { immediate: true }
);

const channelMap = computed<Record<string, SlackChannel>>(() =>
  Object.fromEntries(workspaceChannels.value.map((channel) => [channel.id, channel]))
);

const currentChannel = computed(() => channelMap.value[activeChannelId.value]);

const currentUser = computed(() =>
  members.value.find((member) => member.id === currentUserId.value) ?? null
);

const { data: messagesData, refresh: refreshMessages } = await useAsyncData(
  'slack-messages',
  () => {
    if (!activeChannelId.value) {
      return [];
    }

    return $fetch<SlackMessage[]>(`/api/channels/${activeChannelId.value}/messages`);
  },
  { watch: [activeChannelId] }
);

const channelMessages = computed<SlackMessage[]>(() => messagesData.value ?? []);

const channelMembers = computed(() => {
  const channel = currentChannel.value;
  if (!channel) return [];
  return members.value.filter((member) => channel.memberIds.includes(member.id));
});

const showInfoPanel = ref(true);

async function handleSendMessage(payload: { body: string }) {
  if (!currentChannel.value || !currentUser.value) return;

  try {
    await $fetch(`/api/channels/${currentChannel.value.id}/messages`, {
      method: 'POST',
      body: {
        body: payload.body,
        authorId: currentUser.value.id
      }
    });

    await refreshMessages();
  } catch (error) {
    console.error('Failed to send message', error);
  }
}
</script>

<template>
  <div class="flex h-screen bg-background text-foreground">
    <WorkspaceSidebar
      v-if="currentUser"
      :workspaces="workspaces"
      :active-workspace-id="activeWorkspaceId"
      :current-user="currentUser"
      @select="(workspaceId) => (activeWorkspaceId = workspaceId)"
    />
    <div v-else class="w-20 border-r border-border bg-sidebar" />

    <div class="flex flex-1">
      <ChannelSidebar
        :channels="workspaceChannels"
        :members="members"
        :active-channel-id="activeChannelId"
        :workspace-name="currentWorkspace?.name ?? 'Workspace'"
        @select="(channelId) => (activeChannelId = channelId)"
      />

      <div class="flex flex-1 flex-col">
        <ChatHeader :channel="currentChannel" :members="channelMembers" @open-channel-details="showInfoPanel = true" />
        <MessageList
          :messages="channelMessages"
          :members="members"
          :current-user-id="currentUser?.id ?? ''"
        />
        <MessageComposer
          :channel="currentChannel"
          @submit="handleSendMessage"
        />
      </div>

      <aside
        v-if="showInfoPanel && currentChannel"
        class="hidden w-80 flex-col border-l border-border bg-muted/20 px-5 py-6 xl:flex"
      >
        <header class="mb-6">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold">Detail</h2>
            <button class="text-muted-foreground hover:text-foreground" type="button" @click="showInfoPanel = false">
              <Icon name="mdi:close" class="h-5 w-5" />
            </button>
          </div>
          <p class="text-sm text-muted-foreground">
            {{ currentChannel.topic ?? 'Belum ada deskripsi channel.' }}
          </p>
        </header>

        <section class="space-y-3">
          <div>
            <h3 class="text-xs uppercase tracking-wide text-muted-foreground">Anggota aktif</h3>
            <ul class="mt-3 space-y-2">
              <li v-for="member in channelMembers" :key="member.id" class="flex items-center gap-3">
                <span :class="['h-2.5 w-2.5 rounded-full', member.presence === 'online' ? 'bg-emerald-500' : member.presence === 'away' ? 'bg-amber-500' : 'bg-muted-foreground/40']" />
                <div>
                  <p class="text-sm font-medium">{{ member.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ member.title }}</p>
                </div>
              </li>
            </ul>
          </div>

        </section>
      </aside>
    </div>
  </div>
</template>
