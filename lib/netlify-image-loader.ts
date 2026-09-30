// Named helper for use in components that want a single fixed-size URL (no srcset).
// Falls back to the original URL outside of Netlify so local dev still shows images.
export function netlifyImageSrc(src: string, width: number, quality = 75): string {
    if (process.env.NEXT_PUBLIC_NETLIFY !== 'true') return src
    const params = new URLSearchParams({ url: src, w: String(width), q: String(quality) })
    return `/.netlify/images?${params}`
}

// Returns a thumbnail URL sized to ~20px wide at q=5 to keep under 1 kb.
// Used as the progressive-load placeholder in BlurImage.
export function netlifyThumbnailSrc(src: string): string {
    if (process.env.NEXT_PUBLIC_NETLIFY !== 'true') return src
    const params = new URLSearchParams({ url: src, w: '20', q: '5' })
    return `/.netlify/images?${params}`
}

// Default export consumed by next.config.ts loaderFile — used by <Image> components.
export default function netlifyImageLoader({
    src,
    width,
    quality
}: {
    src: string
    width: number
    quality?: number
}) {
    const params = new URLSearchParams({
        url: src,
        w: String(width),
        q: String(quality ?? 75)
    })
    return `/.netlify/images?${params}`
}
