import posthog from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== 'undefined') {
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      // Helps diagnose missing env var in Cloudflare Pages
      console.warn('PostHog disabled: NEXT_PUBLIC_POSTHOG_KEY is not set.');
    }
  } else {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: 'https://eu.posthog.com',
      capture_exceptions: true,
      debug: process.env.NODE_ENV === 'development',
    });
  }
}
