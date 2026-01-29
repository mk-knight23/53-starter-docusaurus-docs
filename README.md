# TERM.DOCS | Terminal Documentation Starter

<div align="center">

![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A terminal-inspired documentation starter built with Angular 21 Signals and Tailwind CSS**

[Live Demo](#) | [GitHub](#)

</div>

---

## Theme: Terminal / Hacker Aesthetic

This starter kit features a retro terminal/cybersecurity documentation aesthetic:

- **Green-on-black color scheme** - Classic terminal look
- **Monospace typography** - JetBrains Mono for code-like feel
- **Binking cursor** - Terminal prompt animations
- **Command prompt styling** - `$` prefixes, `>` indicators
- **Code block styling** - Syntax highlighting colors
- **CRT effects** - Subtle glow and shadow effects
- **Keyboard shortcuts** - Power user focused

---

## Tech Stack

- **Framework**: Angular 21 (Standalone Components + Signals)
- **Styling**: Tailwind CSS 3.4
- **State**: Angular Signals
- **Icons**: Inline SVGs (zero external dependencies)
- **TypeScript**: 5.9+ with strict mode

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build
```

---

## Terminal Theme Components

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--terminal-green` | `#00ff41` | Primary accent, text |
| `--terminal-green-dim` | `#00aa2a` | Secondary text |
| `--terminal-cyan` | `#00ffff` | Keywords, imports |
| `--terminal-orange` | `#ff9500` | Alerts, notices |
| `--terminal-red` | `#ff3333` | Errors, warnings |
| `--terminal-bg` | `#0a0a0a` | Background |
| `--terminal-bg-dim` | `#0d0d0d` | Sidebar, code blocks |

### Typography

- **JetBrains Mono** - All code, navigation, badges
- **Inter** - Headlines and body text

### Available Classes

```css
.terminal-container    /* Main wrapper */
.terminal-nav          /* Top navigation */
.terminal-logo         /* Logo with cursor blink */
.terminal-sidebar      /* Left sidebar */
.terminal-content      /* Main content area */
.terminal-code-block   /* Code examples */
.terminal-code-inline  /* Inline code */
.terminal-alert        /* Info notices */
.terminal-badge        /* Category badges */
.terminal-toc          /* Table of contents */
```

### Animations

```css
@keyframes blink         /* Cursor blink (1s step-end) */
@keyframes pulse        /* Status indicators */
@keyframes glow         /* Text shadow glow */
```

---

## Layout Structure

```
+--------------------+---------------------------+--------------------+
|                    |                           |                    |
|   SIDEBAR          |   MAIN CONTENT           |   TABLE OF         |
|   (Navigation)     |   (Documentation)        |   CONTENTS         |
|                    |                           |                    |
| // Getting Started | $ Reactive Signals       | // ON THIS PAGE    |
| > introduction     |                          | > Basic Usage      |
| > installation     | [ALERT] Architectural    |   Core Methods     |
| > quick_start      |                          |   Best Practices   |
|                    | ```typescript           |                    |
| // Core Concepts   | code here               |                    |
| > signals_core     | ```                     |                    |
| > typed_routing    |                          |                    |
|                    | [PREVIOUS] [NEXT]       |                    |
+--------------------+---------------------------+--------------------+
|                    |                           |                    |
|                    |     FOOTER                |                    |
|                    |                           |                    |
+--------------------+---------------------------+--------------------+
```

---

## Project Structure

```
src/
├── app/
│   ├── app.component.ts       # Root with terminal theme
│   ├── app.config.ts          # Angular configuration
│   ├── app.routes.ts          # Route definitions
│   └── main.ts                # Bootstrap entry
├── components/
│   └── ui/
│       └── settings-panel.component.ts
├── services/
│   ├── settings.service.ts    # Theme preferences
│   ├── stats.service.ts       # Analytics tracking
│   ├── audio.service.ts       # Sound effects
│   └── keyboard.service.ts    # Keyboard shortcuts
├── styles.css                 # Terminal theme styles
└── index.html                 # HTML shell
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus search |
| `Ctrl/Cmd + /` | Toggle theme |
| `Esc` | Close modals |

---

## Deployment

```bash
# Build for production
ng build

# Deploy dist/ folder to any static host
```

Compatible with Vercel, Netlify, GitHub Pages, and Cloudflare Pages.

---

<div align="center">

**TERM.DOCS** // `./docs --init`

</div>
