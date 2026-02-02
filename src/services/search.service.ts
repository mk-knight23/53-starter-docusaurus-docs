import { Injectable, signal, inject } from '@angular/core';
import { ContentService, type DocSection } from './content.service';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private contentService = inject(ContentService);

  private searchIndex = signal<Map<string, DocSection>>(new Map());
  private results = signal<SearchResult[]>([]);
  private query = signal('');
  private isOpen = signal(false);

  readonly searchResults = this.results.asReadonly();
  readonly searchQuery = this.query.asReadonly();
  readonly isSearchOpen = this.isOpen.asReadonly();

  async indexContent(): Promise<void> {
    const sidebar = this.contentService.getSidebar();
    const index = new Map<string, DocSection>();

    for (const category of sidebar) {
      for (const item of category.items) {
        const content = await this.contentService.loadContent(item.id);
        if (content) {
          index.set(item.id, content);
        }
      }
    }

    this.searchIndex.set(index);
  }

  search(query: string): void {
    this.query.set(query);

    if (!query.trim()) {
      this.results.set([]);
      return;
    }

    const index = this.searchIndex();
    const results: SearchResult[] = [];

    index.forEach((doc, id) => {
      const score = this.calculateScore(doc, query);
      if (score > 0) {
        results.push({
          id,
          title: doc.title,
          category: doc.category,
          excerpt: this.extractExcerpt(doc.content, query),
          score
        });
      }
    });

    this.results.set(
      results
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    );
  }

  private calculateScore(doc: DocSection, query: string): number {
    const q = query.toLowerCase();
    const title = doc.title.toLowerCase();
    const content = doc.content.toLowerCase();

    let score = 0;

    // Title match (highest weight)
    if (title.includes(q)) {
      score += 10;
      if (title === q) score += 20;
    }

    // Content match
    const contentMatches = (content.match(new RegExp(q, 'g')) || []).length;
    score += contentMatches * 0.5;

    // Category match
    if (doc.category.includes(q)) {
      score += 3;
    }

    return score;
  }

  private extractExcerpt(content: string, query: string): string {
    const plainText = content.replace(/<[^>]*>/g, '');
    const q = query.toLowerCase();
    const index = plainText.toLowerCase().indexOf(q);

    if (index === -1) {
      return plainText.substring(0, 150) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(plainText.length, index + query.length + 50);
    const excerpt = plainText.substring(start, end);

    return (start > 0 ? '...' : '') + excerpt + (end < plainText.length ? '...' : '');
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.query.set('');
    this.results.set([]);
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
}
