import { useEffect } from 'react';
import { site } from '../data/site';

type Seo = {
  title: string;
  description: string;
  path: string;
  /** Structured data for this route, injected as a single JSON-LD block. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
};

const SOCIAL_IMAGE = '/og.png';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Per-route head management: title, description, canonical, Open Graph, Twitter
 * and JSON-LD. Runs on every route change so a shared SPA shell still presents
 * correct metadata to crawlers and link unfurlers.
 */
export function useSeo({ title, description, path, jsonLd, ogType = 'website', noindex }: Seo) {
  useEffect(() => {
    const url = `${site.origin}${path === '/' ? '' : path}`;
    const image = `${site.origin}${SOCIAL_IMAGE}`;

    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });
    upsertLink('canonical', url);

    const og: Array<[string, string]> = [
      ['og:site_name', site.name],
      ['og:title', title],
      ['og:description', description],
      ['og:type', ogType],
      ['og:url', url],
      ['og:image', image],
      ['og:image:width', '1200'],
      ['og:image:height', '630'],
      ['og:image:alt', `${site.name} — ${site.tagline}`],
      ['og:locale', 'en_IN'],
    ];
    og.forEach(([property, content]) =>
      upsertMeta(`meta[property="${property}"]`, { property, content }),
    );

    const tw: Array<[string, string]> = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', title],
      ['twitter:description', description],
      ['twitter:image', image],
    ];
    tw.forEach(([name, content]) => upsertMeta(`meta[name="${name}"]`, { name, content }));

    const id = 'route-jsonld';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, ogType, noindex, jsonLd]);
}

/** Breadcrumb graph for any second-level page. */
export function breadcrumb(label: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.origin}/` },
      { '@type': 'ListItem', position: 2, name: label, item: `${site.origin}${path}` },
    ],
  };
}
