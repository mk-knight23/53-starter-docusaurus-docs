import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService, type DocCategory } from '../../../../services/content.service';
import { SearchService } from '../../../../services/search.service';
import { SeoService } from '../../../../services/seo.service';
import { SettingsService } from '../../../../services/settings.service';
import { AudioService } from '../../../../services/audio.service';
import { KeyboardService } from '../../../../services/keyboard.service';
import { SettingsPanelComponent } from '../../../../components/ui/settings-panel.component';

@Component({
  selector: 'app-docs-page',
  standalone: true,
  imports: [CommonModule, SettingsPanelComponent],
  template: `
    <div class="terminal-container" [class.dark]="settingsService.isDarkMode()" [class.light]="!settingsService.isDarkMode()">

      <nav class="terminal-nav">
         <div class="flex items-center gap-8">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 rounded border border-terminal-green flex items-center justify-center">
                  <span class="font-mono text-lg font-bold text-terminal-green cursor-blink">_</span>
               </div>
               <a [routerLink]="['/']" class="terminal-logo">TERM.DOCS</a>
            </div>
            <div class="hidden md:flex items-center gap-6">
               <a [routerLink]="['/']" class="terminal-link" [class.terminal-link-active]="!currentId()">./docs</a>
               <a href="#" class="terminal-link">./api</a>
               <a href="#" class="terminal-link">./examples</a>
            </div>
         </div>

         <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
               <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-terminal-green">$</span>
               <input
                  type="text"
                  placeholder="search..."
                  [value]="searchService.searchQuery()"
                  (input)="onSearch($event)"
                  (focus)="searchService.open()"
                  class="terminal-input pl-8 pr-10 w-56"
               />
               <span class="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-terminal-text-muted">CTRL+K</span>

               <div *ngIf="searchService.isSearchOpen()" class="absolute top-full left-0 right-0 mt-2 bg-terminal-bg border border-terminal-green rounded-lg shadow-xl z-50">
                  <div *ngFor="let result of searchService.searchResults(); track result.id"
                       (click)="navigateTo(result.id)"
                       class="p-3 hover:bg-terminal-green/10 cursor-pointer border-b border-terminal-border last:border-0">
                     <div class="font-mono text-sm text-terminal-green">{{ result.title }}</div>
                     <div class="font-mono text-xs text-terminal-text-muted mt-1">{{ result.excerpt }}</div>
                  </div>
                  <div *ngIf="searchService.searchResults().length === 0" class="p-4 text-center text-terminal-text-muted font-mono text-sm">
                     No results found
                  </div>
               </div>
            </div>

            <button (click)="toggleTheme()" (click)="recordClick()" class="terminal-button !px-3 !py-1.5" [attr.aria-label]="settingsService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
               {{ settingsService.themeLabel() }}
            </button>

            <button (click)="openSettings()" class="terminal-button !px-3 !py-1.5" aria-label="Settings">
               CFG
            </button>
         </div>
      </nav>

      <div class="flex-1 flex">
         <aside class="terminal-sidebar">
            <div class="space-y-8">
               <div *ngFor="let section of sidebar" class="terminal-section">
                  <h4 class="terminal-section-title">// {{ section.title }}</h4>
                  <nav class="space-y-1">
                     <div *ngFor="let item of section.items"
                          [class.terminal-nav-item-active]="currentId() === item.id"
                          (click)="navigateTo(item.id)"
                          class="terminal-nav-item">
                        <span class="text-terminal-green">&gt;</span>
                        <span>{{ item.label }}</span>
                     </div>
                  </nav>
               </div>
            </div>
         </aside>

         <main class="terminal-content">
            <div class="max-w-4xl mx-auto space-y-8" *ngIf="currentContent(); else loading">

               <div class="terminal-breadcrumb">
                  <span routerLink="/" class="terminal-breadcrumb-link cursor-pointer">~</span>
                  <span>/</span>
                  <span>docs</span>
                  <span *ngIf="currentId()">/</span>
                  <span *ngIf="currentId()" class="text-terminal-green">{{ currentId() }}</span>
                  <span class="cursor-blink">_</span>
               </div>

               <article class="space-y-6">
                  <h1 class="terminal-title">{{ currentContent()?.title }}</h1>

                  <div class="prose prose-invert max-w-none" [innerHTML]="currentContent()?.content"></div>
               </article>

               <div class="terminal-divider"></div>
            </div>

            <ng-template #loading>
               <div class="max-w-4xl mx-auto space-y-8">
                  <div class="terminal-breadcrumb">
                     <span class="cursor-blink">_</span>
                  </div>
                  <div class="animate-pulse">
                     <div class="h-8 bg-terminal-border rounded mb-4"></div>
                     <div class="h-4 bg-terminal-border rounded mb-2"></div>
                     <div class="h-4 bg-terminal-border rounded w-3/4"></div>
                  </div>
               </div>
            </ng-template>
         </main>

         <aside class="w-56 p-8 sticky top-14 h-[calc(100vh-4rem)] hidden xl:block overflow-y-auto">
            <div class="space-y-4" *ngIf="contentService.currentToc().length > 0">
               <h4 class="terminal-section-title text-terminal-cyan">// ON THIS PAGE</h4>
               <nav class="space-y-2 font-mono text-xs">
                  <div *ngFor="let item of contentService.currentToc(); track item.id"
                       [style.padding-left.px]="(item.level - 1) * 8"
                       class="terminal-toc-link cursor-pointer hover:text-terminal-green">
                     {{ item.text }}
                  </div>
               </nav>
            </div>
         </aside>
      </div>

      <footer class="terminal-footer flex justify-between items-center">
         <div class="flex items-center gap-4">
            <span class="font-mono text-xs text-terminal-text-muted">TERM.DOCS v2.0.4</span>
            <span class="font-mono text-xs text-terminal-text-muted">|</span>
            <span class="font-mono text-xs text-terminal-text-muted">Angular 21+</span>
         </div>
         <div class="flex items-center gap-4">
            <span class="font-mono text-xs text-terminal-text-muted">STATUS:</span>
            <span class="font-mono text-xs text-terminal-green animate-pulse">ONLINE</span>
         </div>
      </footer>

      <app-settings-panel *ngIf="showSettings" (closePanel)="showSettings = false" />
    </div>
  `,
  styles: [`
    :host { display: block; }
    .prose { color: var(--terminal-text); }
    .prose h1, .prose h2, .prose h3 { color: var(--terminal-text); margin-top: 2rem; }
    .prose code { color: var(--terminal-cyan); }
    .prose pre { background: var(--terminal-bg-dim); border: 1px solid var(--terminal-border); }
  `]
})
export class DocsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public contentService = inject(ContentService);
  public searchService = inject(SearchService);
  private seoService = inject(SeoService);
  public settingsService = inject(SettingsService);
  private audioService = inject(AudioService);
  private keyboardService = inject(KeyboardService);

  currentId = signal<string>('');
  currentContent = signal<Awaited<ReturnType<ContentService['loadContent']>> | null>(null);
  sidebar = signal<DocCategory[]>([]);

  showSettings = false;

  ngOnInit(): void {
    this.sidebar.set(this.contentService.getSidebar());
    this.searchService.indexContent();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params.get('id') || 'introduction';
        this.loadDoc(id);
      });

    this.keyboardService.setHandlers({
      onToggleTheme: () => this.toggleTheme(),
      onOpenSettings: () => this.openSettings(),
      onClose: () => {
        this.showSettings = false;
        this.searchService.close();
      }
    });
  }

  async loadDoc(id: string): Promise<void> {
    this.currentId.set(id);
    const content = await this.contentService.loadContent(id);
    this.currentContent.set(content);

    if (content) {
      this.seoService.updateSeo({
        title: `${content.title} | TERM.DOCS`,
        description: this.extractDescription(content.content)
      });
    }
  }

  extractDescription(html: string): string {
    const text = html.replace(/<[^>]*>/g, '');
    return text.substring(0, 160) + '...';
  }

  navigateTo(id: string): void {
    this.router.navigate([id]);
    this.searchService.close();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchService.search(query);
  }

  toggleTheme(): void {
    this.audioService.playClick();
    this.settingsService.toggleTheme();
  }

  openSettings(): void {
    this.showSettings = true;
  }

  recordClick(): void {
    // Analytics tracking
  }
}
