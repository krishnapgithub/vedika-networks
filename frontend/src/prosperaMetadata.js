// Shared by the static sharing page and client-side navigation.
export const prosperaTitle = 'Prospera';
export const prosperaUrl = 'https://vedikanetworks.com/prospera';
const description = 'Prospera Holidays and Events: personalized holidays, corporate events, gifting and MICE experiences. Memories. Moments. Made with Care.';
const image = 'https://vedikanetworks.com/prospera-hero.png';
export const prosperaMeta = [
  ['name', 'description', description],
  ['property', 'og:type', 'website'],
  ['property', 'og:site_name', prosperaTitle],
  ['property', 'og:title', prosperaTitle],
  ['property', 'og:description', description],
  ['property', 'og:url', prosperaUrl],
  ['property', 'og:image', image],
  ['property', 'og:image:type', 'image/png'],
  ['property', 'og:image:width', '2142'],
  ['property', 'og:image:height', '480'],
  ['property', 'og:image:alt', 'Prospera Holidays and Events - travel destinations and celebrations'],
  ['name', 'twitter:card', 'summary_large_image'],
  ['name', 'twitter:title', prosperaTitle],
  ['name', 'twitter:description', description],
  ['name', 'twitter:image', image],
  ['name', 'twitter:image:alt', 'Prospera Holidays and Events - travel destinations and celebrations'],
];

export function applyProsperaMetadata() {
  // Replace build-generated tags so cleanup also works after a direct visit.
  document.querySelectorAll('[data-prospera-meta]').forEach(node => node.remove());
  const restore = [];
  for (const [attribute, key, content] of prosperaMeta) {
    const existing = document.head.querySelector('meta[' + attribute + '="' + key + '"]');
    const node = existing || document.createElement('meta');
    const previous = node.getAttribute('content');
    node.setAttribute(attribute, key);
    node.setAttribute('content', content);
    if (!existing) document.head.appendChild(node);
    restore.push(() => {
      if (!existing) node.remove();
      else if (previous === null) node.removeAttribute('content');
      else node.setAttribute('content', previous);
    });
  }
  const existing = document.head.querySelector('link[rel="canonical"]');
  const canonical = existing || document.createElement('link');
  const previous = canonical.getAttribute('href');
  canonical.rel = 'canonical';
  canonical.href = prosperaUrl;
  if (!existing) document.head.appendChild(canonical);
  return () => {
    restore.forEach(callback => callback());
    if (!existing) canonical.remove();
    else if (previous === null) canonical.removeAttribute('href');
    else canonical.setAttribute('href', previous);
  };
}
