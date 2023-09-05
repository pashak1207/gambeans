export default function getCurrentDomain(): string {
    const origin =
        typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';

    return origin
}