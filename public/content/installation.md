# Installation

Get started with TERM.DOCS in minutes.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 11+ or compatible package manager
- Angular CLI 21+

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/53-starter-docusaurus-docs.git
cd 53-starter-docusaurus-docs
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Angular 21 framework
- Tailwind CSS and plugins
- Markdown parser (marked)
- Syntax highlighter (highlight.js)

## Step 3: Start Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200`

## Step 4: Add Content

Create Markdown files in `public/content/`:

```bash
public/content/
├── introduction.md
├── installation.md
├── signals.md
└── ...
```

## Configuration

### Custom Theme

Edit `src/styles.css` to customize colors:

```css
:root {
  --terminal-green: #00ff41;
  --terminal-bg: #0a0a0a;
}
```

### Navigation

Update the sidebar in `src/services/content.service.ts`:

```typescript
getSidebar(): DocCategory[] {
  return [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'introduction' }
      ]
    }
  ];
}
```

## Troubleshooting

### Port Already in Use

```bash
ng serve --port 4300
```

### Build Errors

Clear the cache and rebuild:

```bash
rm -rf node_modules dist
npm install
ng build
```

## Next Steps

- [Quick Start Guide](quickstart)
- [Core Concepts](signals)
