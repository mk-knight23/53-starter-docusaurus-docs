import { Injectable, signal, inject, HostListener, OnDestroy } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);

  private enabled = signal(true);

  private onToggleTheme: (() => void) | null = null;
  private onOpenSettings: (() => void) | null = null;
  private onClose: (() => void) | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  setHandlers(handlers: {
    onToggleTheme?: () => void;
    onOpenSettings?: () => void;
    onClose?: () => void;
  }): void {
    this.onToggleTheme = handlers.onToggleTheme ?? null;
    this.onOpenSettings = handlers.onOpenSettings ?? null;
    this.onClose = handlers.onClose ?? null;
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (!this.enabled()) return;
    if (!(event.target instanceof HTMLBodyElement)) return;

    const keys: string[] = [];

    if (event.ctrlKey || event.metaKey) keys.push('ctrl');
    if (event.shiftKey) keys.push('shift');
    if (event.altKey) keys.push('alt');
    if (event.key.toLowerCase() !== 'control' && event.key.toLowerCase() !== 'shift' && event.key.toLowerCase() !== 'alt' && event.key.toLowerCase() !== 'meta') {
      keys.push(event.key.toLowerCase());
    }

    const keyCombo = keys.join('+');

    if (event.key === 'Escape') {
      event.preventDefault();
      this.onClose?.();
    }

    const themeShortcut = KEYBOARD_SHORTCUTS.TOGGLE_THEME.join('+');
    if (keyCombo === themeShortcut && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.onToggleTheme?.();
    }

    const settingsShortcut = KEYBOARD_SHORTCUTS.OPEN_SETTINGS.join('+');
    if (keyCombo === settingsShortcut && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      this.onOpenSettings?.();
    }
  }

  setEnabled(value: boolean): void {
    this.enabled.set(value);
  }
}
