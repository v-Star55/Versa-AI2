export function createRateLimiter(minDelay: number) {
    let lastRequestTime = Date.now() - minDelay;

    return async function rateLimiter() {
        const now = Date.now();
        const nextAllowedRequestTime = lastRequestTime + minDelay;
        if (now < nextAllowedRequestTime) {
            const delay = nextAllowedRequestTime - now;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        lastRequestTime = Date.now();
    };
}