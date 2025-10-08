<script setup lang="ts">
const capabilities = [
  {
    title: 'Product Strategy',
    highlight: 'Align vision with measurable outcomes.',
    description:
      'Translate insights into roadmaps that balance ambition with clarity. I help teams ship experiences that feel inevitable.'
  },
  {
    title: 'Design Systems',
    highlight: 'Build scalable, future-friendly foundations.',
    description:
      'Create expressive UI systems that adapt across platforms while staying rigorously accessible and easy to implement.'
  },
  {
    title: 'Collaboration',
    highlight: 'Elevate the work through partnership.',
    description:
      'Facilitate the tough conversations, keep momentum, and ensure engineers, PMs, and stakeholders feel heard.'
  }
];

const featuredProjects = [
  {
    name: 'Evergreen OS',
    summary: 'Reimagined the onboarding flow for the flagship productivity suite used by 12M+ daily.',
    impact: 'Increased activation by 27% through contextual guidance and adaptive layouts.',
    link: '#'
  },
  {
    name: 'Beacon Analytics',
    summary: 'Built a data storytelling toolkit that turned raw metrics into decisions for enterprise leaders.',
    impact: 'Cut time-to-insight from days to hours by unifying editorial and quantitative workflows.',
    link: '#'
  },
  {
    name: 'Pulse Care',
    summary: 'Crafted the mobile experience for a digital health startup during rapid scale.',
    impact: 'Reached a 4.9 app store rating while navigating regulated environments and complex states.',
    link: '#'
  }
];

const experience = [
  {
    timeframe: '2021 — Present',
    role: 'Principal Product Designer',
    company: 'Northbound',
    notes: 'Leading the platform design strategy across growth, activation, and design systems.'
  },
  {
    timeframe: '2018 — 2021',
    role: 'Senior UX Designer',
    company: 'Orbit Labs',
    notes: 'Shipped end-to-end journeys for the enterprise SaaS suite powering financial teams worldwide.'
  },
  {
    timeframe: '2014 — 2018',
    role: 'Product Designer',
    company: 'Indigo Collective',
    notes: 'Partnered with early-stage startups to define product-market fit and polish the v1 experience.'
  }
];

useHead({
  title: 'Aruna Warsono — Product Designer',
  meta: [
    {
      name: 'description',
      content:
        'Personal site for Aruna Warsono, a product designer crafting intentional experiences for ambitious teams.'
    }
  ]
});

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="relative min-h-screen bg-zinc-950 text-zinc-100">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]"></div>
    </div>

    <div class="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 pb-24 pt-24 sm:px-12 lg:px-16">
      <header class="flex flex-col gap-12">
        <div class="flex items-center justify-between text-sm text-zinc-400">
          <div class="flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Currently crafting product experiences in Jakarta
          </div>
          <nav class="hidden items-center gap-8 sm:flex">
            <a href="#work" class="transition hover:text-white">Work</a>
            <a href="#experience" class="transition hover:text-white">Experience</a>
            <a href="#contact" class="transition hover:text-white">Contact</a>
          </nav>
        </div>

        <div class="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div class="space-y-6">
            <p class="text-sm uppercase tracking-[0.4em] text-emerald-300">Product Designer</p>
            <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Designing calm, confident interfaces for teams with bold roadmaps.
            </h1>
            <p class="text-lg text-zinc-300 lg:max-w-xl">
              I help ambitious products feel intuitive from first touch. With a decade across SaaS, productivity, and
              health tech, I blend systems thinking with editorial storytelling to ship experiences that stick.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <Button as-child size="lg" class="bg-white text-zinc-900 hover:bg-zinc-200">
                <a href="#work">View selected work</a>
              </Button>
              <Button as-child variant="outline" size="lg" class="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                <a href="#contact">Let’s collaborate</a>
              </Button>
            </div>
          </div>
          <div class="relative flex flex-col gap-4 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-2xl shadow-emerald-500/10">
            <div class="text-sm uppercase tracking-[0.3em] text-zinc-500">Signal</div>
            <p class="text-sm leading-relaxed text-zinc-300">
              “Aruna brings clarity to messy environments. The way she frames problems makes collaboration frictionless
              and keeps teams shipping fast.”
            </p>
            <div class="flex items-center gap-3 pt-4 text-sm text-zinc-400">
              <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500"></div>
              <div>
                <div class="text-white">Larasati Widodo</div>
                <div>Director of Product, Northbound</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="focus" class="grid gap-6 lg:grid-cols-3">
        <h2 class="col-span-full text-sm uppercase tracking-[0.4em] text-zinc-500">Focus Areas</h2>
        <article
          v-for="capability in capabilities"
          :key="capability.title"
          class="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 transition hover:border-emerald-400/40 hover:bg-zinc-900"
        >
          <div class="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 transition group-hover:opacity-100"></div>
          <h3 class="text-xl font-semibold text-white">{{ capability.title }}</h3>
          <p class="mt-3 text-sm text-emerald-300">{{ capability.highlight }}</p>
          <p class="mt-4 text-sm leading-relaxed text-zinc-300">{{ capability.description }}</p>
        </article>
      </section>

      <section id="work" class="space-y-6">
        <div class="flex flex-col gap-3">
          <h2 class="text-sm uppercase tracking-[0.4em] text-zinc-500">Selected Work</h2>
          <p class="text-2xl font-semibold text-white">Projects that moved the needle.</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <article
            v-for="project in featuredProjects"
            :key="project.name"
            class="group flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-zinc-900"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-white">{{ project.name }}</h3>
              <span class="text-xs uppercase tracking-[0.3em] text-zinc-500">Case study</span>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-zinc-300">{{ project.summary }}</p>
            <p class="mt-4 text-sm font-medium text-emerald-300">{{ project.impact }}</p>
            <a
              :href="project.link"
              class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition group-hover:text-emerald-300"
            >
              View details
              <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span>
            </a>
          </article>
        </div>
      </section>

      <section id="experience" class="grid gap-10 lg:grid-cols-[1fr,1.2fr] lg:items-start">
        <div class="space-y-4">
          <h2 class="text-sm uppercase tracking-[0.4em] text-zinc-500">Experience</h2>
          <p class="text-2xl font-semibold text-white">A track record of shipping complex products with momentum.</p>
          <p class="text-sm text-zinc-400">
            From pre-seed scrappiness to high-growth SaaS, I embed with teams to ship with confidence, align stakeholders,
            and evolve systems with intention.
          </p>
        </div>
        <ol class="relative space-y-8 border-l border-zinc-800 pl-6">
          <li
            v-for="role in experience"
            :key="role.company"
            class="relative rounded-2xl border border-transparent p-4 transition hover:border-emerald-400/40 hover:bg-zinc-900/50"
          >
            <span class="absolute -left-[29px] top-6 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-emerald-400/60"></span>
            <div class="text-sm uppercase tracking-[0.3em] text-zinc-500">{{ role.timeframe }}</div>
            <p class="mt-2 text-lg font-semibold text-white">{{ role.role }}</p>
            <p class="text-sm text-emerald-300">{{ role.company }}</p>
            <p class="mt-2 text-sm leading-relaxed text-zinc-300">{{ role.notes }}</p>
          </li>
        </ol>
      </section>

      <section id="contact" class="relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 p-10">
        <div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"></div>
        <div class="space-y-4">
          <h2 class="text-sm uppercase tracking-[0.4em] text-emerald-300">Let’s build</h2>
          <p class="text-3xl font-semibold text-white">Have an ambitious roadmap that needs clarity?</p>
          <p class="max-w-2xl text-sm text-emerald-100">
            I work with teams who care about craft, momentum, and measurable outcomes. Tell me about your next milestone,
            and let’s explore how design can unlock it.
          </p>
        </div>
        <div class="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          <Button as-child size="lg" class="bg-white text-zinc-900 hover:bg-zinc-200">
            <a href="mailto:hello@arunawarsono.com">Email me</a>
          </Button>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" class="transition hover:text-white">
            LinkedIn
          </a>
          <a href="https://www.dribbble.com" target="_blank" rel="noopener" class="transition hover:text-white">
            Dribbble
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener" class="transition hover:text-white">
            GitHub
          </a>
        </div>
      </section>

      <footer class="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-sm text-zinc-500">
        <p>© {{ currentYear }} Aruna Warsono. Crafted in Jakarta.</p>
        <a href="#" class="transition hover:text-white">Download résumé</a>
      </footer>
    </div>
  </div>
</template>
