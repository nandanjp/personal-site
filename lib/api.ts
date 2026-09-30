import { z } from 'zod'

import { env } from './env'

// Schemas mirror the response structs in nandanjp/personal-api. Types are
// derived from them, so a schema and its type cannot drift apart.
//
// Unknown keys are stripped rather than rejected: the API can add a field and
// deploy before this repo does, and that must not break the site.

export const PhotoSchema = z.object({
    key: z.string(),
    url: z.string(),
    size: z.number()
})
export type Photo = z.infer<typeof PhotoSchema>

export const TrackSchema = z.object({
    id: z.string(),
    name: z.string(),
    artists: z.array(z.string()),
    album_name: z.string(),
    // Empty when a track resolved without cover art.
    album_art_url: z.string(),
    duration_ms: z.number(),
    external_url: z.string()
})
export type Track = z.infer<typeof TrackSchema>

export const GitHubStatsSchema = z.object({
    username: z.string(),
    name: z.string(),
    bio: z.string().nullable(),
    avatar_url: z.string(),
    followers: z.number(),
    following: z.number(),
    public_repos: z.number(),
    total_stars: z.number(),
    languages: z.array(z.object({ name: z.string(), count: z.number() }))
})
export type GitHubStats = z.infer<typeof GitHubStatsSchema>

export const GitHubRepoSchema = z.object({
    name: z.string(),
    full_name: z.string(),
    description: z.string().nullable(),
    url: z.string(),
    stars: z.number(),
    forks: z.number(),
    language: z.string().nullable(),
    topics: z.array(z.string()),
    open_issues: z.number(),
    updated_at: z.string()
})
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>

const PhotosResponse = z.object({ photos: z.array(PhotoSchema) })
const TracksResponse = z.object({ tracks: z.array(TrackSchema) })
const ReposResponse = z.object({
    repos: z.array(GitHubRepoSchema),
    // Count of pinned repos the API could not resolve. Optional because nothing
    // here reads it, so its absence should not fail the page.
    missing: z.number().optional()
})

async function apiFetch<T extends z.ZodType>(path: string, schema: T): Promise<z.infer<T>> {
    const res = await fetch(`${env.NEXT_PUBLIC_PERSONAL_API_URL}${path}`)
    if (!res.ok) throw new Error(`personal-api ${res.status}: ${path}`)

    const parsed = schema.safeParse(await res.json())
    if (!parsed.success) {
        // Names the offending field, so a contract change is obvious rather than
        // surfacing later as an undefined deep inside a component.
        const detail = parsed.error.issues
            .map(issue => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
            .join('; ')
        throw new Error(`personal-api ${path}: unexpected response shape — ${detail}`)
    }
    return parsed.data
}

export const api = {
    photos: {
        list: () => apiFetch('/photos', PhotosResponse)
    },
    music: {
        list: () => apiFetch('/music', TracksResponse)
    },
    github: {
        stats: () => apiFetch('/github/stats', GitHubStatsSchema),
        repos: () => apiFetch('/github/repos', ReposResponse)
    }
}
