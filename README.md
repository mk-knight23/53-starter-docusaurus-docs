# DocPrime - Modern Documentation Engine

<div align="center">

![Angular](https://img.shields.io/badge/Angular_21- DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A production-grade documentation theme built with Angular 21 Signals**

[Live Demo](https://docprime.vercel.app) | [GitHub](https://github.com/mk-knight23/56-Docusaurus-Docs-Starter)

</div>

---

## Overview

DocPrime is a modern documentation engine built on Angular 21's new Signals architecture. It provides a high-performance, accessible foundation for technical documentation sites.

### Problem Statement

Traditional documentation themes often suffer from:
- Heavy JavaScript bundles slowing page loads
- Complex build configurations
- Limited theming options
- Poor mobile experience

### Solution

DocPrime provides:
- **Signal-Based Architecture**: Fine-grained reactivity for optimal performance
- **Dark/Light Mode**: Full theme support with system detection and persistence
- **Zero External Dependencies**: Inline SVGs eliminate icon library overhead
- **Full Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

---

## Features Comparison

| Feature | Legacy Docs | DocPrime (v2.0) |
| :--- | :--- | :--- |
| **Framework** | Standard Angular | **Angular 21 + Signals** |
| **Reactivity** | Zone.js | **Fine-grained Signals** |
| **Theme** | Fixed | **Dark + Light with persistence** |
| **Icons** | External library | **Zero-dependency inline SVGs** |
| **Performance** | Full tree checking | **Component-level updates** |
| **Accessibility** | Basic | **ARIA labels, keyboard nav** |

---

## Tech Stack

- **Framework**: Angular 21 (Standalone Components + Signals)
- **Styling**: Tailwind CSS 3.4
- **Icons**: Inline SVGs (no external dependencies)
- **TypeScript**: 5.9+ with strict mode

---

## Architecture

```
src/
└── app/
    ├── app.component.ts     # Root component with Signals & theme
    ├── app.config.ts        # Application configuration
    └── main.ts              # Bootstrap entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/56-Docusaurus-Docs-Starter.git
cd 56-Docusaurus-Docs-Starter

# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build
```

---

## Theme System

DocPrime includes a fully-featured dark/light mode with:

- **System Detection**: Auto-detects OS preference
- **Manual Toggle**: Switch via navbar button
- **Persistence**: Preference saved in localStorage
- **Smooth Transitions**: 500ms CSS transitions

---

## Accessibility

The documentation engine includes comprehensive accessibility features:

- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy and landmarks

---

## Deployment

Compatible with any static hosting:

- **Vercel**: `npx vercel --prod`
- **Netlify**: Connect repository
- **GitHub Pages**: Deploy `dist/` folder

```bash
# Deploy to Vercel
npx vercel --prod --name docprime

# Preview production build
ng build && npm run preview
```

---

## Signal Architecture

DocPrime demonstrates Angular 21's signal-based reactivity:

```typescript
export class App {
  isDarkMode = signal(true);
  activePage = signal('signals');

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }
}
```

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with Angular 21 + Signals + Tailwind CSS**

</div>
