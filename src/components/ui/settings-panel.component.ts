import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, type ThemeMode } from '../../services/settings.service';
import { StatsService } from '../../services/stats.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="close()"></div>

      <div class="relative w-full max-w-lg bg-white dark:bg-doc-dark border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-white/10">
          <h2 class="text-xl font-display font-black uppercase tracking-tight" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">
            Settings
          </h2>
          <button
            (click)="close()"
            class="p-2 rounded-xl transition-colors"
            [class.hover:bg-slate-100]="!isDarkMode"
            [class.hover:bg-white/5]="isDarkMode"
            [class.text-slate-400]="!isDarkMode"
            [class.text-slate-400]="isDarkMode"
            aria-label="Close settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <div class="space-y-4">
            <label class="text-xs font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">
              Theme
            </label>
            <div class="grid grid-cols-3 gap-3">
              @for (theme of themes; track theme.value) {
                <button
                  (click)="selectTheme(theme.value)"
                  class="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all"
                  [class.border-blue-600]="settingsService.settings().theme === theme.value"
                  [class.bg-blue-50]="settingsService.settings().theme === theme.value && !isDarkMode"
                  [class.bg-blue-900/20]="settingsService.settings().theme === theme.value && isDarkMode"
                  [class.border-slate-200]="settingsService.settings().theme !== theme.value && !isDarkMode"
                  [class.border-white/10]="settingsService.settings().theme !== theme.value && isDarkMode"
                  [class.hover:border-blue-600/50]="settingsService.settings().theme !== theme.value"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="24" [attr.height]="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class.text-blue-600]="settingsService.settings().theme === theme.value" [class.text-slate-400]="settingsService.settings().theme !== theme.value">
                    @if (theme.value === 'light') {
                      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                    } @else if (theme.value === 'dark') {
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                    } @else {
                      <rect width="7" height="7" x="3" y="3" rx="1"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/>
                    }
                  </svg>
                  <span class="text-xs font-bold uppercase tracking-wide" [class]="settingsService.settings().theme === theme.value ? 'text-blue-600' : 'text-slate-500'">
                    {{ theme.label }}
                  </span>
                </button>
              }
            </div>
          </div>

          <div class="space-y-4">
            <label class="text-xs font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">
              Preferences
            </label>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <div class="flex items-center gap-4">
                  <div class="p-2 rounded-xl" [class]="isDarkMode ? 'bg-white/10' : 'bg-slate-200'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="isDarkMode ? 'text-slate-400' : 'text-slate-500'"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  </div>
                  <div>
                    <p class="font-bold text-sm uppercase tracking-wide" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">Sound Effects</p>
                    <p class="text-xs" [class]="isDarkMode ? 'text-slate-500' : 'text-slate-400'">Enable audio feedback</p>
                  </div>
                </div>
                <button
                  (click)="toggleSound()"
                  class="relative w-14 h-7 rounded-full transition-colors"
                  [class.bg-blue-600]="settingsService.settings().soundEnabled"
                  [class.bg-slate-600]="!settingsService.settings().soundEnabled"
                >
                  <span
                    class="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform"
                    [class.translate-x-7]="settingsService.settings().soundEnabled"
                    [class.translate-x-1]="!settingsService.settings().soundEnabled"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <div class="flex items-center gap-4">
                  <div class="p-2 rounded-xl" [class]="isDarkMode ? 'bg-white/10' : 'bg-slate-200'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="isDarkMode ? 'text-slate-400' : 'text-slate-500'"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <div>
                    <p class="font-bold text-sm uppercase tracking-wide" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">Animations</p>
                    <p class="text-xs" [class]="isDarkMode ? 'text-slate-500' : 'text-slate-400'">Enable transitions</p>
                  </div>
                </div>
                <button
                  (click)="toggleAnimations()"
                  class="relative w-14 h-7 rounded-full transition-colors"
                  [class.bg-blue-600]="settingsService.settings().animationsEnabled"
                  [class.bg-slate-600]="!settingsService.settings().animationsEnabled"
                >
                  <span
                    class="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform"
                    [class.translate-x-7]="settingsService.settings().animationsEnabled"
                    [class.translate-x-1]="!settingsService.settings().animationsEnabled"
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <label class="text-xs font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">
              Statistics
            </label>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <p class="text-2xl font-black uppercase tracking-tight" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsService.statsSummary().totalVisits }}</p>
                <p class="text-[10px] font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">Visits</p>
              </div>
              <div class="p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <p class="text-2xl font-black uppercase tracking-tight" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsService.statsSummary().totalClicks }}</p>
                <p class="text-[10px] font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">Clicks</p>
              </div>
              <div class="p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <p class="text-2xl font-black uppercase tracking-tight" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsService.statsSummary().themeSwitches }}</p>
                <p class="text-[10px] font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">Theme Switches</p>
              </div>
              <div class="p-4 rounded-2xl" [class]="isDarkMode ? 'bg-white/5' : 'bg-slate-50'" [class.border]="isDarkMode ? 'border-white/10' : 'border-slate-200'">
                <p class="text-2xl font-black uppercase tracking-tight" [class]="isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsService.statsSummary().shortcutsUsed }}</p>
                <p class="text-[10px] font-black uppercase tracking-widest" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">Shortcuts</p>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              (click)="exportData()"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border"
              [class.border-slate-200]="!isDarkMode"
              [class.border-white/10]="isDarkMode"
              [class.bg-white]="!isDarkMode"
              [class.bg-white/5]="isDarkMode"
              [class.hover:border-blue-600]="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export
            </button>
            <button
              (click)="resetAll()"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border"
              [class.border-slate-200]="!isDarkMode"
              [class.border-white/10]="isDarkMode"
              [class.bg-white]="!isDarkMode"
              [class.bg-white/5]="isDarkMode"
              [class.hover:border-red-500]="true"
              [class.text-red-500]="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>
        </div>

        <div class="px-8 py-4 border-t" [class.border-slate-100]="!isDarkMode" [class.border-white/10]="isDarkMode" [class.bg-slate-50]="!isDarkMode" [class.bg-white/5]="isDarkMode">
          <p class="text-[10px] font-black uppercase tracking-widest text-center" [class]="isDark ? 'text-slate-500' : 'text-slate-400'">
            Keyboard Shortcuts: <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Ctrl+K</kbd> Theme <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Ctrl+S</kbd> Settings <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Esc</kbd> Close
          </p>
        </div>
      </div>
    </div>
  `
})
export class SettingsPanelComponent {
  @Output() closePanel = new EventEmitter<void>();

  settingsService = inject(SettingsService);
  statsService = inject(StatsService);
  private audioService = inject(AudioService);

  get isDarkMode(): boolean {
    return this.settingsService.isDarkMode();
  }

  get isDark(): boolean {
    return this.settingsService.isDarkMode();
  }

  themes: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ];

  selectTheme(theme: ThemeMode): void {
    this.audioService.playToggle();
    this.settingsService.setTheme(theme);
    this.statsService.recordThemeSwitch();
  }

  toggleSound(): void {
    this.audioService.playClick();
    this.settingsService.toggleSound();
  }

  toggleAnimations(): void {
    this.audioService.playClick();
    this.settingsService.toggleAnimations();
  }

  close(): void {
    this.audioService.playClick();
    this.closePanel.emit();
  }

  exportData(): void {
    const data = {
      settings: this.settingsService.exportSettings(),
      stats: this.statsService.exportStats(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docs-export.json';
    a.click();
    URL.revokeObjectURL(url);
    this.audioService.playToggle();
  }

  resetAll(): void {
    if (confirm('Reset all settings and statistics?')) {
      this.settingsService.resetSettings();
      this.statsService.resetStats();
      this.audioService.playToggle();
    }
  }
}
