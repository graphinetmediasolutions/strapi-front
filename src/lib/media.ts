// lib/media.js

/**
 * Constructs a full absolute URL for a media file (image or video) from a relative Strapi URL.
 *
 * @param {string | null | undefined} url The relative URL from Strapi (e.g., '/uploads/image.png').
 * @returns {string | null} The absolute URL (e.g., 'http://localhost:1337/uploads/image.png') or null if the input URL is invalid or base URL is missing.
 */
export function getStrapiMedia(url : string | null | undefined) {
  if (url == null) {
    return null;
  }

  // If the URL is already absolute, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Get the base URL from environment variables
  // In Next.js, NEXT_PUBLIC_ variables are available on both server and client
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  // If the base URL is not configured, log an error and return null
  if (!strapiBaseUrl) {
    console.error(
      'NEXT_PUBLIC_STRAPI_BASE_URL is not defined in your environment variables. ' +
      'Cannot construct absolute media URL for:', url
    );
    return null;
  }

  // Ensure the base URL doesn't end with a slash and the relative URL starts with one
  const cleanBaseUrl = strapiBaseUrl.endsWith('/') ? strapiBaseUrl.slice(0, -1) : strapiBaseUrl;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  return `${cleanBaseUrl}${cleanUrl}`;
}