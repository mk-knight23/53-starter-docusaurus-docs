import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Book, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Github, 
  ExternalLink, 
  Moon, 
  Sun,
  Layout,
  Layers,
  Terminal,
  Compass,
  Zap,
  Command
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="min-h-screen flex flex-col bg-white dark:bg-doc-dark transition-colors duration-500">
      
      <!-- Top Global Nav -->
      <nav class="h-16 border-b border-slate-100 dark:border-white/5 px-8 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-doc-dark/80 backdrop-blur-md z-50 transition-all duration-300">
         <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2">
               <div class="bg-blue-600 p-1.5 rounded-lg">
                  <lucide-icon name="book" [size]="18" class="text-white"></lucide-icon>
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
               <lucide-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" [size]="14"></lucide-icon>
               <input type="text" placeholder="Search documentation..." class="bg-slate-100 dark:bg-white/5 border-none rounded-lg pl-10 pr-4 py-1.5 text-xs w-64 outline-none focus:ring-1 focus:ring-blue-600 transition-all">
               <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 opacity-40">
                  <lucide-icon name="command" [size]="10"></lucide-icon>
                  <span class="text-[8px] font-black">K</span>
               </div>
            </div>
            <button (click)="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
               <lucide-icon [name]="isDarkMode() ? 'sun' : 'moon'" [size]="18"></lucide-icon>
            </button>
            <a href="https://github.com/mk-knight23/56-Docusaurus-Docs-Starter" target="_blank" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
               <lucide-icon name="github" [size]="18"></lucide-icon>
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
                        <lucide-icon [name]="item.icon" [size]="16"></lucide-icon>
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
                  <lucide-icon name="chevron-right" [size]="10"></lucide-icon>
                  <span class="text-blue-600">Core Concepts</span>
                  <lucide-icon name="chevron-right" [size]="10"></lucide-icon>
                  <span class="dark:text-white">Signals Architecture</span>
               </div>

               <!-- Article -->
               <article class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:rounded-2xl">
                  <h1 class="text-5xl font-black">Reactive Architectures with Signals</h1>
                  <p class="text-xl text-slate-500 font-medium italic leading-relaxed">Understanding the fundamental shift in Angular's change detection strategy.</p>
                  
                  <div class="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex space-x-4">
                     <div class="p-2 bg-blue-600 rounded-lg text-white h-fit"><lucide-icon name="zap" [size]="16"></lucide-icon></div>
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
                        <lucide-icon name="chevron-left" [size]="16"></lucide-icon>
                        <span>Installation Guide</span>
                     </div>
                  </div>
                  <div class="flex flex-col items-end group cursor-pointer">
                     <span class="text-[10px] font-black uppercase text-slate-400 mb-2">Next Page</span>
                     <div class="flex items-center space-x-2 text-slate-900 dark:text-white font-bold group-hover:text-blue-600 transition-colors">
                        <span>Computed Values</span>
                        <lucide-icon name="chevron-right" [size]="16"></lucide-icon>
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
  isDarkMode = signal(true);
  activePage = signal('signals');

  sidebar = [
    {
      title: 'Getting Started',
      items: [
        { id: 'intro', label: 'Introduction', icon: 'terminal' },
        { id: 'install', label: 'Installation', icon: 'zap' }
      ]
    },
    {
      title: 'Architecture',
      items: [
        { id: 'signals', label: 'Signals Core', icon: 'layers' },
        { id: 'routing', label: 'Typed Routing', icon: 'compass' },
        { id: 'forms', label: 'Reactive Forms', icon: 'layout' }
      ]
    }
  ];

  constructor() {
    if (this.isDarkMode()) document.documentElement.classList.add('dark');
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    document.documentElement.classList.toggle('dark');
  }
}
