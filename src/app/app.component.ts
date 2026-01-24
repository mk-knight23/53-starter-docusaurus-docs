import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex flex-col bg-white dark:bg-doc-dark transition-colors duration-500">

      <!-- Top Global Nav -->
      <nav class="h-16 border-b border-slate-100 dark:border-white/5 px-8 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-doc-dark/80 backdrop-blur-md z-50 transition-all duration-300">
         <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2">
               <div class="bg-blue-600 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
               </div>
               <span class="font-display font-black text-lg tracking-tight dark:text-white uppercase">Doc<span class="text-blue-600">Prime</span></span>
            </div>
            <div class="hidden md:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <a href="#" class="text-blue-600">Docs</a>
               <a href="#" class="hover:text-slate-900 dark:hover:text-white transition-colors">API</a>
               <a href="#" class="hover:text-slate-900 dark:hover:text-white transition-colors">Showcase</a>
            </div>
         </div>

         <div class="flex items-center space-x-4">
            <div class="relative group hidden sm:block">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               <input type="text" placeholder="Search documentation..." class="bg-slate-100 dark:bg-white/5 border-none rounded-lg pl-10 pr-4 py-1.5 text-xs w-64 outline-none focus:ring-1 focus:ring-blue-600 transition-all">
               <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="1"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
                  <span class="text-[8px] font-black">K</span>
               </div>
            </div>
            <button (click)="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors" [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
               <svg *ngIf="isDarkMode()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
               <svg *ngIf="!isDarkMode()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </button>
            <a href="https://github.com/mk-knight23/56-Docusaurus-Docs-Starter" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors" aria-label="GitHub">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
         </div>
      </nav>

      <div class="flex-1 flex">
         <!-- Sidebar Navigation -->
         <aside class="w-72 border-r border-slate-100 dark:border-white/5 p-8 flex flex-col h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex overflow-y-auto custom-scrollbar">
            <div class="space-y-10">
               <div *ngFor="let section of sidebar" class="space-y-4">
                  <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4">{{ section.title }}</h4>
                  <nav class="space-y-1">
                     <div *ngFor="let item of section.items"
                          [class.doc-nav-item-active]="activePage() === item.id"
                          (click)="activePage.set(item.id)"
                          class="doc-nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline [attr.points]="item.iconPoints"/></svg>
                        <span class="text-xs font-bold">{{ item.label }}</span>
                     </div>
                  </nav>
               </div>
            </div>
         </aside>

         <!-- Documentation Content -->
         <main class="flex-1 min-w-0 p-8 lg:p-16 overflow-y-auto">
            <div class="max-w-4xl mx-auto space-y-12">

               <!-- Breadcrumbs -->
               <div class="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Docs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  <span class="text-blue-600">Core Concepts</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  <span class="dark:text-white">Signals Architecture</span>
               </div>

               <!-- Article -->
               <article class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:rounded-2xl">
                  <h1 class="text-5xl font-black">Reactive Architectures with Signals</h1>
                  <p class="text-xl text-slate-500 font-medium italic leading-relaxed">Understanding the fundamental shift in Angular's change detection strategy.</p>

                  <div class="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex space-x-4">
                     <div class="p-2 bg-blue-600 rounded-lg text-white h-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                     </div>
                     <div>
                        <h5 class="text-blue-600 dark:text-blue-400 font-black uppercase text-[10px] tracking-widest mb-1">Architectural Insight</h5>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Signals provide a more granular way to track state changes, enabling the framework to optimize change detection at the component level rather than checking the entire tree.</p>
                     </div>
                  </div>

                  <h2>Introduction</h2>
                  <p>In Angular 19, the reactive primitive known as <strong>Signals</strong> has reached full maturity. This guide explores how to transition from Zone.js-based architectures to modern, signal-driven environments.</p>

                  <pre class="font-mono text-xs p-8 shadow-2xl"><code>const count = signal(0);
const double = computed(() => count() * 2);

effect(() => &#123;
  console.log(\`Count changed: &#36;&#123;count()&#125;\`);
&#125;);</code></pre>

                  <h3>Core Advantages</h3>
                  <ul>
                     <li><strong>Synchronous Execution:</strong> No more microtask scheduling overhead.</li>
                     <li><strong>Fine-grained Updates:</strong> Only the specific parts of the DOM that depend on a signal will re-render.</li>
                     <li><strong>Improved DX:</strong> Clearer data flow and less reliance on complex RxJS operators for simple state.</li>
                  </ul>
               </article>

               <!-- Navigation Footer -->
               <div class="pt-20 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <div class="flex flex-col items-start group cursor-pointer">
                     <span class="text-[10px] font-black uppercase text-slate-400 mb-2">Previous Page</span>
                     <div class="flex items-center space-x-2 text-slate-900 dark:text-white font-bold group-hover:text-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        <span>Installation Guide</span>
                     </div>
                  </div>
                  <div class="flex flex-col items-end group cursor-pointer">
                     <span class="text-[10px] font-black uppercase text-slate-400 mb-2">Next Page</span>
                     <div class="flex items-center space-x-2 text-slate-900 dark:text-white font-bold group-hover:text-blue-600 transition-colors">
                        <span>Computed Values</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                     </div>
                  </div>
               </div>

            </div>
         </main>

         <!-- TOC Sidebar -->
         <aside class="w-64 p-8 sticky top-16 h-[calc(100vh-4rem)] hidden xl:block overflow-y-auto">
            <div class="space-y-6">
               <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">On this page</h4>
               <nav class="space-y-4 text-xs font-bold text-slate-500">
                  <div class="hover:text-blue-600 cursor-pointer border-l-2 border-blue-600 pl-4 text-blue-600">Performance Benefits</div>
                  <div class="hover:text-blue-600 cursor-pointer pl-4">Core Implementation</div>
                  <div class="hover:text-blue-600 cursor-pointer pl-4">Best Practices</div>
                  <div class="hover:text-blue-600 cursor-pointer pl-4">Legacy Migration</div>
               </nav>
            </div>
         </aside>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class App {
  private platformId = inject(PLATFORM_ID);
  isDarkMode = signal(true);
  activePage = signal('signals');

  sidebar = [
    {
      title: 'Getting Started',
      items: [
        { id: 'intro', label: 'Introduction', iconPoints: '4 4 4 20 20 20' },
        { id: 'install', label: 'Installation', iconPoints: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' }
      ]
    },
    {
      title: 'Architecture',
      items: [
        { id: 'signals', label: 'Signals Core', iconPoints: '2 12 22 12 12 2 12 22' },
        { id: 'routing', label: 'Typed Routing', iconPoints: '3 3 21 21 12 8 12 21' },
        { id: 'forms', label: 'Reactive Forms', iconPoints: '3 3 21 21 9 9 15 15' }
      ]
    }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved) {
        this.isDarkMode.set(saved === 'dark');
      } else {
        this.isDarkMode.set(!window.matchMedia('(prefers-color-scheme: light)').matches);
      }
      this.applyTheme();
    }
  }

  applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme();
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }
}
