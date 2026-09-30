export const SITE = {
    // ── Identity ────────────────────────────────────────────────────────────
    identity: {
        name: 'Nandan Patel',
        email: 'nandan.jp17@gmail.com',
        github: 'nandanjp',
        githubUrl: 'https://github.com/nandanjp',
        twitterUrl: null as string | null,
        profileImageUrl:
            'https://personal-api.nandan-hl.dev/photos/1f9d6f7683799bbdc7b0b70585dfef1f.jpg' as
                | string
                | null
    },

    // ── Navigation ──────────────────────────────────────────────────────────
    nav: {
        links: [
            { path: '/blog', label: 'Blog' },
            { path: '/projects', label: 'Projects' },
            { path: '/photos', label: 'Photos' },
            { path: '/music', label: 'Music' },
            { path: '/work', label: 'Work' }
        ] as { path: string; label: string }[]
    },

    // ── Homepage ─────────────────────────────────────────────────────────────
    home: {
        hero: {
            label: '[01] — intro',
            heading: 'Nandan\nPatel.',
            status: 'available for work',
            tagline:
                'Software engineer looking to build scalable, distributed, and useful systems.',
            building: { project1: 'personal-api', project2: 'this site' },
            cta: { primary: 'View Projects', secondary: 'Read Blog' }
        },

        about: {
            label: '[02] — about',
            heading: 'Backend systems\nand infrastructure.',
            body: [
                'I build infrastructure, design distributed systems, write low-level code, and create system tools. Graphics programming is where I want to go, but still a stretch away.',
                'Outside of that, I powerlift, watch shows, learn languages, and travel.'
            ],
            stackLabel: 'tech stack',
            languagesLabel: 'Languages',
            toolsLabel: 'Tools'
        },

        architecture: {
            label: '[03] — architecture',
            heading: 'Homelab Systems Design',
            body: 'A desktop PC running Ubuntu Server with k3s for Kubernetes workloads. Every service (API, cache, object store, database) runs on bare metal.',
            filename: 'systems-design.excalidraw',
            clusterLabel: 'k8s cluster · homelab',
            deploymentsLabel: 'live deployments',
            deployedApps: [
                { emoji: '🌐', name: 'Personal Site', url: 'nandanjp.io' },
                {
                    emoji: '🖼️',
                    name: 'Vault',
                    url: 'vault.nandan-hl.dev'
                },
                {
                    emoji: '🎬',
                    name: 'Dramalist',
                    url: 'dramalist.nandan-hl.dev'
                }
            ]
        },

        graphics: {
            label: '[04] — graphics & games',
            heading: 'Graphics, games,\nand the GPU.',
            filename: 'pokemon-player-room.glb',
            body: [
                'I always wanted to become a physicist. Then I realized that physics could be implemented, engineered into a simulated world through math. That realization is what pulled me toward engineering.',
                'Graphics is where that interest lives in code. Shaders, real-time rendering, and GPU programming are as close as you can get to doing real physics in software.'
            ]
        },

        interests: {
            label: '[05] — beyond code',
            heading: 'Life beyond\nthe terminal.',
            sub: 'Engineering is what I do. Curiosity is who I am.',
            filename: 'beyond-code.sh',
            entries: [
                {
                    cmd: 'powerlifting',
                    color: '#f87171',
                    type: 'text' as const,
                    text: 'Competing in powerlifting. Bench · Squat · Deadlift.'
                },
                {
                    cmd: 'sports',
                    color: '#4ade80',
                    type: 'text' as const,
                    text: 'Volleyball, basketball, soccer. Always up for a game.'
                },
                {
                    cmd: 'traveling',
                    color: '#60a5fa',
                    type: 'text' as const,
                    text: 'New cities, new food, new perspectives. Always planning the next trip.'
                },
                {
                    cmd: 'languages',
                    color: '#c084fc',
                    type: 'languages' as const
                },
                {
                    cmd: 'watching',
                    color: '#fbbf24',
                    type: 'text' as const,
                    text: 'Anime, films, and shows. Always mid-series on something good.'
                },
                { cmd: 'music', color: '#f472b6', type: 'music' as const }
            ],
            languages: [
                { label: 'English', level: 'native' },
                { label: '日本語', level: '少し', note: '(a little)' },
                { label: '中文', level: '一点点', note: '(a tiny bit)' }
            ],
            musicLink: 'see /music →'
        },

        cta: {
            label: '[06] — say hello',
            heading: "Glad you're here."
        }
    },

    // ── Work / Resume ────────────────────────────────────────────────────────
    work: {
        label: '[work] — experience & projects',
        heading: "Where I've Been.",
        sub: 'A few places I have worked and things I have built.',
        filename: 'resume.excalidraw',
        resumeName: 'Nandan Patel',
        resumeBio: '21 · University of Waterloo',
        experienceLabel: 'Work Experience',
        projectsLabel: 'Projects',
        entries: [
            {
                company: 'Whatnot',
                role: 'Software Engineer Intern',
                period: '2026 – present',
                rotate: -0.6,
                bullets: [
                    'Building ML tooling and infrastructure for the Whatnot platform.'
                ]
            },
            {
                company: 'Shopify',
                role: 'Software Engineer Intern',
                period: 'Jan 2026 – Apr 2026',
                rotate: 0.5,
                bullets: [
                    'Worked on checkout system maintenance and reliability.',
                    'Collaborated with a fast-moving, high-calibre team on high-traffic services.'
                ]
            },
            {
                company: 'Faire',
                role: 'Software Engineer Intern',
                period: 'May 2025 – Aug 2025',
                rotate: -0.3,
                bullets: [
                    'Redesigned the entire brand order fulfillment flow end-to-end.',
                    'First real exposure to building software at production scale with real users.'
                ]
            }
        ],
        projects: [
            {
                name: 'Vault',
                url: 'https://photos.nandan-hl.dev',
                tech: 'Go · MinIO · Kafka · Kubernetes',
                rotate: 0.6,
                bullets: [
                    'Self-hosted image gallery for photos I take, with preview and transformation support.',
                    'Processing pipeline built on Kafka and MinIO with no third-party platform needed.',
                    'Deployed on homelab Kubernetes alongside the rest of my personal infrastructure.'
                ]
            },
            {
                name: 'Dramalist',
                url: 'https://sadge-list.nandan-hl.dev',
                tech: 'Go · PostgreSQL · Redis · Kafka · MinIO',
                rotate: -0.5,
                bullets: [
                    'A better MyAnimeList and MyDramalist, built full-stack with strict latency targets.',
                    'Backend optimized with Redis and Kafka; content delivery tuned for speed.',
                    'Public frontend for users to curate lists and write AI-assisted reviews.'
                ]
            }
        ]
    },

    // ── Projects ─────────────────────────────────────────────────────────────
    projects: {
        label: '[projects] — built & shipped',
        heading: "Things I've Built.",
        sub: 'Open-source work and side projects. Stats synced from GitHub.'
    },

    // ── Photos ───────────────────────────────────────────────────────────────
    photos: {
        label: '[photos] — captured moments',
        heading: 'Through the Lens.',
        sub: 'Scenes and subjects I found worth capturing, mostly candid and always personal.'
    },

    // ── Music ────────────────────────────────────────────────────────────────
    music: {
        label: '[music] — on repeat',
        heading: 'On Rotation.',
        sub: "What I've been listening to lately."
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
        tagline: 'Building scalable, distributed, and useful systems.'
    },

    // ── Empty / error states ─────────────────────────────────────────────────
    empty: {
        photos: { heading: 'No photos yet', sub: 'Check back soon.' },
        music: { heading: 'No tracks yet', sub: 'Check back soon.' },
        projects: { heading: 'No repos found', sub: 'Check back soon.' },
        blog: {
            heading: 'Post not found',
            sub: "The post you're looking for doesn't exist."
        }
    }
} as const
