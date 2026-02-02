# TERM.DOCS | Terminal Documentation Starter

<div align="center">

![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A terminal-inspired documentation engine built with Angular 21 Signals and Tailwind CSS**

[Live Demo](https://docprime.vercel.app) | [GitHub](https://github.com/mk-knight23/56-Docusaurus-Docs-Starter)

</div>

---

## Overview

TERM.DOCS is a production-ready documentation system featuring:

- **Angular 21** with standalone components
- **Signals-based** reactivity for fine-grained updates
- **Terminal aesthetic** with green-on-black design
- **Client-side search** with fuzzy matching
- **SEO-optimized** with meta tags and structured data
- **Markdown support** with syntax highlighting
- **Keyboard-driven** navigation

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/53-starter-docusaurus-docs.git
cd 53-starter-docusaurus-docs

# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build
```

Navigate to `http://localhost:4200`

---

## Project Structure

```
src/
├── app/
│   ├── features/
│   │   └── docs/
│   │       └── components/
│   │           └── docs-page.component.ts    # Main docs layout
│   ├── services/
│   │   ├── content.service.ts                # Markdown loader
│   │   ├── search.service.ts                 # Client-side search
│   │   ├── seo.service.ts                    # Meta tag management
│   │   ├── settings.service.ts               # Theme preferences
│   │   ├── stats.service.ts                  # Analytics
│   │   ├── audio.service.ts                  # Sound effects
│   │   └── keyboard.service.ts               # Keyboard shortcuts
│   ├── components/
│   │   └── ui/
│   │       └── settings-panel.component.ts   # Settings modal
│   └── app.routes.ts                         # Route definitions
├── styles.css                                 # Terminal theme
└── main.ts

public/
└── content/                                   # Markdown files
    ├── introduction.md
    ├── installation.md
    └── ...
```

---

## Adding Content

### 1. Create Markdown Files

Add `.md` files to `public/content/`:

```markdown
# Page Title

Description paragraph...

## Features

- Feature 1
- Feature 2

## Code Example

\`\`\`typescript
const example = 'code here';
\`\`\`
```

### 2. Update Sidebar

Edit `src/services/content.service.ts`:

```typescript
getSidebar(): DocCategory[] {
  return [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'introduction' },
        { id: 'installation', label: 'installation' }
      ]
    }
  ];
}
```

### 3. Navigation

Access your content at `http://localhost:4200/installation`

---

## Customization

### Theme Colors

Edit `src/styles.css`:

```css
:root {
  --terminal-green: #00ff41;
  --terminal-bg: #0a0a0a;
  --terminal-cyan: #00ffff;
}
```

### Typography

Configure fonts in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
  },
}
```

### Navigation

Update routes in `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/docs/components/docs-page.component')
      .then(m => m.DocsPageComponent),
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./features/docs/components/docs-page.component')
      .then(m => m.DocsPageComponent)
  }
];
```

---

## Features

### Content Management

- **Markdown parsing** with marked.js
- **Syntax highlighting** with highlight.js
- **Table of contents** auto-generation
- **Breadcrumb navigation**
- **Previous/Next navigation**

### Search

- **Client-side search** with fuzzy matching
- **Real-time indexing** of all content
- **Keyboard shortcut** (Ctrl/Cmd + K)
- **Relevance scoring** for results

### SEO

- **Meta tags** for each page
- **Open Graph** tags for social sharing
- **Structured data** (JSON-LD)
- **Sitemap ready**
- **Canonical URLs**

### Theming

- **Terminal aesthetic** with animations
- **Dark/Light/System** theme modes
- **Settings panel** for preferences
- **Persistent storage** via localStorage
- **Reduced motion** support

---

## Deployment

### GitHub Pages

1. Update `angular.json`:
```json
"baseHref": "./"
```

2. Configure GitHub Actions in `.github/workflows/deploy.yml`

3. Push to main branch - auto-deploys

### Vercel/Netlify

```bash
ng build --configuration production
# Deploy dist/ folder
```

### Environment Variables

Optional: Create `.env` for configuration:

```bash
NG_APP_SITE_URL=https://yourdomain.com
NG_APP_GA_TRACKING_ID=UA-XXXXX-Y
```

---

## Development

### Type Safety

All services use TypeScript strict mode:

```typescript
export interface DocSection {
  id: string;
  title: string;
  content: string;
  category: string;
}
```

### Signals Pattern

Use Signals for reactive state:

```typescript
export class ContentService {
  private content = signal<Map<string, DocSection>>(new Map());
  readonly currentContent = this.content.asReadonly();
}
```

### Dependency Injection

Use `inject()` function:

```typescript
export class DocsPageComponent {
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
}
```

---

## Performance

- **Initial bundle**: 68.72 kB
- **Standalone components**: Tree-shakable
- **Lazy loading**: Route-based code splitting
- **OnPush change detection**: By default
- **Signals**: Fine-grained reactivity

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus search |
| `Ctrl/Cmd + /` | Toggle theme |
| `Esc` | Close modals |

---

## Architecture

### Services

- **ContentService** - Loads and parses Markdown
- **SearchService** - Full-text search with scoring
- **SeoService** - Manages meta tags
- **SettingsService** - Theme and preferences
- **StatsService** - Local analytics
- **AudioService** - Sound effects
- **KeyboardService** - Keyboard shortcuts

### Components

- **DocsPageComponent** - Main layout with sidebar, content, TOC
- **SettingsPanelComponent** - Settings modal

---

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
ng build
```

### Routes Not Working

- Check `app.routes.ts`
- Verify component paths
- Clear browser cache

### Search Not Finding Content

- Verify `.md` files exist in `public/content/`
- Check sidebar configuration
- Rebuild: Refresh page

### Styling Issues

- Clear browser cache
- Check Tailwind CSS classes
- Verify `styles.css` is loaded

---

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## License

MIT License - feel free to use for personal or commercial projects.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/your-org/repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/repo/discussions)

---

<div align="center">

**TERM.DOCS** // `./docs --init`

Built with Angular 21 + Signals + Tailwind CSS

</div>
