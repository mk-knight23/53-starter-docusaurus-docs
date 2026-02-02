import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { marked } from 'marked';
import highlightjs from 'highlight.js';

export interface DocSection {
  id: string;
  title: string;
  content: string;
  category: string;
  order: number;
}

export interface DocCategory {
  title: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private content = signal<Map<string, DocSection>>(new Map());
  private toc = signal<TocItem[]>([]);

  readonly currentContent = this.content.asReadonly();
  readonly currentToc = this.toc.asReadonly();

  constructor() {
    this.configureMarked();
  }

  private configureMarked(): void {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  async loadContent(id: string): Promise<DocSection | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const response = await fetch(`/assets/content/${id}.md`);
      if (!response.ok) return null;

      const markdown = await response.text();
      const html = await marked.parse(markdown);

      const section: DocSection = {
        id,
        title: this.extractTitle(markdown),
        content: html,
        category: this.extractCategory(id),
        order: 0
      };

      this.content.update(map => new Map(map).set(id, section));
      this.generateToc(markdown);

      return section;
    } catch {
      return null;
    }
  }

  private extractTitle(markdown: string): string {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1] : 'Untitled';
  }

  private extractCategory(id: string): string {
    const parts = id.split('/');
    return parts[0] || 'general';
  }

  private generateToc(markdown: string): void {
    const headings = markdown.match(/^#{1,3}\s+.+$/gm) || [];
    const toc: TocItem[] = headings.map(heading => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { id, text, level };
    });
    this.toc.set(toc);
  }

  getSidebar(): DocCategory[] {
    return [
      {
        title: 'Getting Started',
        items: [
          { id: 'introduction', label: 'introduction' },
          { id: 'installation', label: 'installation' },
          { id: 'quickstart', label: 'quick_start' }
        ]
      },
      {
        title: 'Core Concepts',
        items: [
          { id: 'signals', label: 'signals_core' },
          { id: 'routing', label: 'typed_routing' },
          { id: 'forms', label: 'reactive_forms' }
        ]
      },
      {
        title: 'Advanced',
        items: [
          { id: 'optimization', label: 'performance' },
          { id: 'testing', label: 'unit_testing' },
          { id: 'deployment', label: 'deployment' }
        ]
      }
    ];
  }
}
