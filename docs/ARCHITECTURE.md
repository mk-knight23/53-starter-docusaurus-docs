# Architecture | TERM.DOCS Angular App

## Overview

TERM.DOCS is an Angular 21 documentation starter featuring a terminal/hacker aesthetic. It leverages Angular Signals for fine-grained reactivity and provides a production-ready foundation for technical documentation.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 21 (Standalone Components) |
| Reactivity | Angular Signals |
| Styling | Tailwind CSS 3.4 |
| State | Signal-based services |
| Routing | Angular Router 4.x |
| TypeScript | 5.9+ strict mode |

## Directory Structure

```
src/
├── app/
│   ├── app.component.ts       # Root with terminal theme
│   ├── app.config.ts          # Application configuration
│   ├── app.routes.ts          # Route definitions
│   ├── app.spec.ts            # Root component tests
├── components/
│   └── ui/
│       └── settings-panel.component.ts
├── services/
│   ├── settings.service.ts    # Theme preferences (Signal-based)
│   ├── stats.service.ts       # Analytics tracking
│   ├── audio.service.ts       # Sound effects
│   └── keyboard.service.ts    # Keyboard shortcuts
├── styles.css                 # Terminal theme styles
├── main.ts                    # Bootstrap entry point
└── index.html                 # HTML shell
```

## Signal Architecture

### Settings Service

Uses Angular Signals for theme state:

```typescript
export class SettingsService {
  private theme = signal<'light' | 'dark'>('dark');

  isDarkMode = computed(() => this.theme() === 'dark');

  loadSettings(): void {
    const saved = localStorage.getItem('theme');
    if (saved) this.theme.set(saved as 'light' | 'dark');
    this.updateColorScheme();
  }

  toggleTheme(): void {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
    this.updateColorScheme();
    localStorage.setItem('theme', this.theme());
  }
}
```

### Active Page State

```typescript
export class App {
  activePage = signal('signals');

  setActivePage(id: string): void {
    this.activePage.set(id);
  }
}
```

## Component Structure

### Root Component

- Manages theme state via SettingsService
- Handles keyboard shortcuts via KeyboardService
- Renders three-column layout: sidebar, content, TOC
- Includes footer with version info

### Sidebar Navigation

```typescript
sidebar = [
  {
    title: 'Getting Started',
    items: [
      { id: 'intro', label: 'introduction' },
      { id: 'install', label: 'installation' }
    ]
  }
];
```

## Tailwind Configuration

Uses Tailwind CSS with custom theme values:

```css
@theme {
  --terminal-green: #00ff41;
  --terminal-bg: #0a0a0a;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Build Output

```
dist/
├── index.html           # Main entry
├── main.js              # Application bundle
├── styles.css           # Compiled styles
└── assets/              # Static assets
```

## Development

```bash
# Start dev server
ng serve

# Run tests
ng test

# Type checking
ng build

# Preview production build
ng build && npm run preview
```

## Performance

- **Signals**: Fine-grained reactivity, no Zone.js needed
- **Standalone Components**: Tree-shakable, smaller bundles
- **Tailwind CSS**: Zero-runtime CSS
- **Lazy Loading**: Route-based code splitting

## Keyboard Shortcuts

| Shortcut | Handler |
|----------|---------|
| `Ctrl/Cmd + K` | Focus search |
| `Ctrl/Cmd + /` | Toggle theme |
| `Esc` | Close modals |

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation throughout
- Focus visible states
- Semantic heading hierarchy
- Color contrast maintained

## Deployment

Pre-configured for:
- Vercel (zero config)
- Netlify (zero config)
- GitHub Pages
- Cloudflare Pages

```bash
ng build
# Deploy dist/ folder
```
