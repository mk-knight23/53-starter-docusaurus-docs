import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);

  private defaultTitle = 'TERM.DOCS | Terminal Documentation Starter';
  private defaultDescription = 'A terminal-inspired documentation starter built with Angular 21 Signals and Tailwind CSS';
  private siteName = 'TERM.DOCS';

  updateSeo(data: Partial<SeoData>): void {
    const title = data.title || this.defaultTitle;
    const description = data.description || this.defaultDescription;
    const url = this.baseUrl + this.router.url;

    // Basic meta tags
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords.join(', ') });
    }

    if (data.author) {
      this.meta.updateTag({ name: 'author', content: data.author });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: data.ogType || 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

    if (data.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: data.ogImage });
    }

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (data.ogImage) {
      this.meta.updateTag({ name: 'twitter:image', content: data.ogImage });
    }

    // Canonical URL
    this.meta.updateTag({ rel: 'canonical', href: url });
  }

  addStructuredData(data: Record<string, unknown>): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  private get baseUrl(): string {
    const base = document.querySelector('base')?.getAttribute('href') || '/';
    return `${window.location.origin}${base}`;
  }

  reset(): void {
    this.updateSeo({});
  }
}
