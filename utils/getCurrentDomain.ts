import { headers } from 'next/headers';

export default function getCurrentDomain(): string {
    const origin =
        typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : headers().get('host') || "";

    return origin
}