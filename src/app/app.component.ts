import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../services/settings.service';
import { StatsService } from '../services/stats.service';
import { AudioService } from '../services/audio.service';
import { KeyboardService } from '../services/keyboard.service';
import { SettingsPanelComponent } from '../components/ui/settings-panel.component';

@Component({
  selector: 'app-root',
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
               <span class="terminal-logo">TERM.DOCS</span>
            </div>
            <div class="hidden md:flex items-center gap-6">
               <a href="#" class="terminal-link terminal-link-active">./docs</a>
               <a href="#" class="terminal-link">./api</a>
               <a href="#" class="terminal-link">./examples</a>
            </div>
         </div>

         <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
               <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-terminal-green">$</span>
               <input type="text" placeholder="search..." class="terminal-input pl-8 pr-10 w-56" />
               <span class="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-terminal-text-muted">CTRL+K</span>
            </div>

            <button (click)="toggleTheme()" (click)="recordClick()" class="terminal-button !px-3 !py-1.5" [attr.aria-label]="settingsService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
               {{ settingsService.isDarkMode() ? 'LGT' : 'DRK' }}
            </button>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="terminal-button !px-3 !py-1.5" aria-label="GitHub">
               GH
            </a>
         </div>
      </nav>

      <div class="flex-1 flex">
         <aside class="terminal-sidebar">
            <div class="space-y-8">
               <div *ngFor="let section of sidebar" class="terminal-section">
                  <h4 class="terminal-section-title">// {{ section.title }}</h4>
                  <nav class="space-y-1">
                     <div *ngFor="let item of section.items"
                          [class.terminal-nav-item-active]="activePage() === item.id"
                          (click)="setActivePage(item.id)"
                          class="terminal-nav-item">
                        <span class="text-terminal-green">&gt;</span>
                        <span>{{ item.label }}</span>
                     </div>
                  </nav>
               </div>
            </div>
         </aside>

         <main class="terminal-content">
            <div class="max-w-4xl mx-auto space-y-8">

               <div class="terminal-breadcrumb">
                  <span class="hover:terminal-breadcrumb-link cursor-pointer">~</span>
                  <span>/</span>
                  <span class="hover:terminal-breadcrumb-link cursor-pointer">docs</span>
                  <span>/</span>
                  <span class="terminal-green">core</span>
                  <span>/</span>
                  <span class="text-terminal-text">signals</span>
                  <span class="cursor-blink">_</span>
               </div>

               <article class="space-y-6">
                  <h1 class="terminal-title">Reactive Signals</h1>
                  <p class="terminal-description">
                     Initializing reactive primitives for granular state management. Documentation v2.0.4
                  </p>

                  <div class="terminal-alert">
                     <div class="terminal-alert-title">
                        <span class="text-terminal-orange">[!]</span> ARCHITECTURAL NOTE
                     </div>
                     <p class="text-terminal-text-muted text-sm">
                        Signals provide synchronous execution with fine-grained updates. No Zone.js overhead. Pure reactivity.
                     </p>
                  </div>

                  <h2 class="text-xl font-bold text-terminal-text mt-8">Basic Usage</h2>
                  <div class="terminal-code-block">
                     <pre><code><span class="text-terminal-cyan">import</span> &#123; signal, computed, effect &#125; <span class="text-terminal-cyan">from</span> <span class="text-terminal-orange">'@angular/core'</span>;

<span class="text-terminal-text-muted">// Create a signal</span>
<span class="text-terminal-green">const</span> count = signal(<span class="text-terminal-cyan">0</span>);

<span class="text-terminal-text-muted">// Create computed value</span>
<span class="text-terminal-green">const</span> double = computed(() => count() * <span class="text-terminal-cyan">2</span>);

<span class="text-terminal-text-muted">// Create effect</span>
effect(() => &#123;
  console.log(<span class="text-terminal-orange">'Count: '</span> + count());
&#125;);</code></pre>
                  </div>

                  <h2 class="text-xl font-bold text-terminal-text mt-8">Core Methods</h2>
                  <div class="space-y-4 mt-4">
                     <div class="flex items-start gap-4">
                        <span class="terminal-badge">signal()</span>
                        <div>
                           <p class="text-terminal-text text-sm">Creates a reactive signal value</p>
                           <p class="font-mono text-xs text-terminal-text-muted mt-1">signal(initialValue)</p>
                        </div>
                     </div>
                     <div class="flex items-start gap-4">
                        <span class="terminal-badge">computed()</span>
                        <div>
                           <p class="text-terminal-text text-sm">Creates a derived reactive value</p>
                           <p class="font-mono text-xs text-terminal-text-muted mt-1">computed(() =&gt; expression)</p>
                        </div>
                     </div>
                     <div class="flex items-start gap-4">
                        <span class="terminal-badge">effect()</span>
                        <div>
                           <p class="text-terminal-text text-sm">Runs a function when dependencies change</p>
                           <p class="font-mono text-xs text-terminal-text-muted mt-1">effect(() =&gt; sideEffect)</p>
                        </div>
                     </div>
                  </div>
               </article>

               <div class="terminal-divider"></div>
               <div class="flex justify-between items-center">
                  <div class="group cursor-pointer">
                     <span class="font-mono text-[10px] text-terminal-text-muted mb-1 block">PREVIOUS</span>
                     <div class="flex items-center gap-2 font-mono text-sm text-terminal-green group-hover:text-terminal-green-dim">
                        <span>&lt;</span>
                        <span>installation</span>
                     </div>
                  </div>
                  <div class="group cursor-pointer">
                     <span class="font-mono text-[10px] text-terminal-text-muted mb-1 block text-right">NEXT</span>
                     <div class="flex items-center gap-2 font-mono text-sm text-terminal-green group-hover:text-terminal-green-dim">
                        <span>typed-routing</span>
                        <span>&gt;</span>
                     </div>
                  </div>
               </div>

            </div>
         </main>

         <aside class="w-56 p-8 sticky top-14 h-[calc(100vh-4rem)] hidden xl:block overflow-y-auto">
            <div class="space-y-4">
               <h4 class="terminal-section-title text-terminal-cyan">// ON THIS PAGE</h4>
               <nav class="space-y-2 font-mono text-xs">
                  <div class="terminal-toc-link terminal-toc-link-active cursor-pointer">Basic Usage</div>
                  <div class="terminal-toc-link cursor-pointer hover:text-terminal-green">Core Methods</div>
                  <div class="terminal-toc-link cursor-pointer hover:text-terminal-green">Best Practices</div>
                  <div class="terminal-toc-link cursor-pointer hover:text-terminal-green">Migration Guide</div>
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
  `]
})
export class App implements OnInit {
  public settingsService = inject(SettingsService);
  public statsService = inject(StatsService);
  private audioService = inject(AudioService);
  private keyboardService = inject(KeyboardService);

  showSettings = false;
  activePage = signal('signals');

  sidebar = [
    {
      title: 'Getting Started',
      items: [
        { id: 'intro', label: 'introduction' },
        { id: 'install', label: 'installation' },
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

  ngOnInit(): void {
    this.settingsService.loadSettings();
    this.settingsService.updateColorScheme();
    this.statsService.loadStats();
    this.statsService.recordVisit();

    this.keyboardService.setHandlers({
      onToggleTheme: () => this.toggleTheme(),
      onOpenSettings: () => this.openSettings(),
      onClose: () => {
        this.showSettings = false;
        this.settingsService.hideHelp();
      }
    });
  }

  toggleTheme(): void {
    this.audioService.playClick();
    this.settingsService.toggleTheme();
    this.statsService.recordThemeSwitch();
  }

  openSettings(): void {
    this.showSettings = true;
    this.statsService.recordSettingsOpen();
  }

  recordClick(): void {
    this.statsService.recordClick();
  }

  setActivePage(id: string): void {
    this.activePage.set(id);
    this.recordClick();
  }
}
