'use client'

import { useState, useEffect, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'
import { netlifyImageSrc } from '@/lib/netlify-image-loader'
import { Skeleton } from '@/components/ui/skeleton'
import { MonoText } from '@/components/ui/typography'
import { EmptyHeading, EmptyBody } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { PhotoGrid } from './PhotoGrid'
import { PhotoLightbox } from './PhotoLightbox'
import { api } from '@/lib/api'
import type { Photo } from '@/lib/api'

const SKELETON_STRIP_THEMES = [
    'bg-sky-100/80 dark:bg-sky-950/40',
    'bg-violet-100/80 dark:bg-violet-950/40',
    'bg-emerald-100/80 dark:bg-emerald-950/40',
    'bg-rose-100/80 dark:bg-rose-950/40',
    'bg-amber-100/80 dark:bg-amber-950/40',
    'bg-teal-100/80 dark:bg-teal-950/40'
]

function PhotoCardSkeleton({ stripTheme }: { stripTheme: string }) {
    return (
        <div className="w-full max-w-70 overflow-hidden rounded-[3px] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.13)] dark:bg-zinc-900 dark:shadow-[0_3px_14px_rgba(0,0,0,0.45)]">
            <div className="p-2 pb-1.5">
                <Skeleton className="aspect-square w-full rounded-[1px]" />
            </div>
            <div className={cn('h-8', stripTheme)} />
        </div>
    )
}

function PhotoGallerySkeleton() {
    return (
        <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-3 lg:gap-8">
            {/* Collage cluster placeholder — spans 2 cols like the real thing */}
            <div className="col-span-2 flex w-full items-end justify-center gap-0 pt-6 pb-4">
                {['-9deg', '2deg', '10deg'].map((rotate, i) => (
                    <div
                        key={i}
                        style={{ rotate, zIndex: i === 1 ? 3 : i === 0 ? 1 : 2, width: '36%', flexShrink: 0, marginLeft: i > 0 ? '-2.75rem' : undefined }}
                        className="overflow-hidden rounded-[3px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.15)] dark:bg-zinc-900"
                    >
                        <div className="p-2 pb-1.5">
                            <Skeleton className="aspect-square w-full rounded-[1px]" />
                        </div>
                        <div className={cn('h-8', SKELETON_STRIP_THEMES[i % SKELETON_STRIP_THEMES.length])} />
                    </div>
                ))}
            </div>
            {/* Grid cards */}
            {Array.from({ length: 6 }).map((_, i) => (
                <PhotoCardSkeleton key={i} stripTheme={SKELETON_STRIP_THEMES[(i + 3) % SKELETON_STRIP_THEMES.length]} />
            ))}
        </div>
    )
}

export function PhotoGallery() {
    const [mounted, setMounted] = useState(false)
    const [, startTransition] = useTransition()
    useEffect(() => { startTransition(() => setMounted(true)) }, [])

    const { data, isPending, isError } = useQuery({
        queryKey: ['photos'],
        queryFn: () => api.photos.list(),
        refetchOnWindowFocus: false
    })
    const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

    if (!mounted || isPending) return <PhotoGallerySkeleton />

    const photos = data?.photos ?? []

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-2 py-16">
                <EmptyHeading>Couldn&apos;t load photos.</EmptyHeading>
                <EmptyBody>Try again shortly.</EmptyBody>
            </div>
        )
    }

    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16">
                <EmptyHeading>No photos yet.</EmptyHeading>
                <EmptyBody>Check back soon.</EmptyBody>
            </div>
        )
    }

    const currentIndex = lightboxPhoto
        ? photos.findIndex(photo => photo.key === lightboxPhoto.key)
        : -1

    function prefetchPhoto(url: string) {
        const img = new window.Image()
        img.src = netlifyImageSrc(url, 600, 60)
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setLightboxPhoto(photos[currentIndex - 1])
            if (currentIndex - 2 >= 0) prefetchPhoto(photos[currentIndex - 2].url)
        }
    }

    function handleNext() {
        if (currentIndex < photos.length - 1) {
            setLightboxPhoto(photos[currentIndex + 1])
            if (currentIndex + 2 < photos.length) prefetchPhoto(photos[currentIndex + 2].url)
        }
    }

    return (
        <>
            <MonoText className="mb-6 block">{photos.length} photos</MonoText>
            <PhotoGrid photos={photos} onPhotoClick={setLightboxPhoto} />
            {lightboxPhoto && (
                <PhotoLightbox
                    photo={lightboxPhoto}
                    total={photos.length}
                    currentIndex={currentIndex}
                    onClose={() => setLightboxPhoto(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </>
    )
}
