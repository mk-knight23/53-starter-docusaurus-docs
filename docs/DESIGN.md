# Design System | TERM.DOCS Theme

## Theme Identity

**Theme Name:** Terminal / Hacker Aesthetic
**Primary Color:** Terminal Green (`#00ff41`)
**Background:** Deep Black (`#0a0a0a`)

## Design Principles

1. **Terminal First** - Every element mimics a command-line interface
2. **Code as Content** - Documentation is presented like code
3. **Keyboard Driven** - Power user shortcuts and navigation
4. **Retro Aesthetic** - CRT-era design sensibilities
5. **High Contrast** - Maximum readability with green on black

## Color System

### Primary Palette

```css
--terminal-green: #00ff41;
--terminal-green-dim: #00aa2a;
--terminal-green-glow: #00ff41;
--terminal-cyan: #00ffff;
--terminal-orange: #ff9500;
--terminal-red: #ff3333;
```

### Backgrounds

```css
--terminal-bg: #0a0a0a;
--terminal-bg-dim: #0d0d0d;
--terminal-border: #1a1a1a;
```

### Text Colors

```css
--terminal-text: #e0e0e0;
--terminal-text-muted: #666666;
```

## Typography

- **JetBrains Mono** - All UI elements, navigation, badges, code
- **Inter** - Headlines and long-form content

## Component Patterns

### Terminal Nav Item

```html
<div class="terminal-nav-item terminal-nav-item-active">
  <span class="text-terminal-green">&gt;</span>
  <span>signals_core</span>
</div>
```

### Code Block

```html
<div class="terminal-code-block">
  <pre><code>
    <span class="text-terminal-cyan">import</span> ...
  </code></pre>
</div>
```

### Alert Box

```html
<div class="terminal-alert">
  <div class="terminal-alert-title">
    <span class="text-terminal-orange">[!]</span> NOTE
  </div>
  <p>Alert content...</p>
</div>
```

### Badge

```html
<span class="terminal-badge">signal()</span>
```

## Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| blink | 1s step-end | Cursor, prompt |
| pulse | 2s ease-in-out | Status indicators |
| glow | 3s ease-in-out | Logo, special text |

## Terminal Elements

### Command Prompt

```css
.terminal-logo::before {
  content: '>';
  animation: blink 1s step-end infinite;
}
```

### Inline Code

```css
.terminal-code-inline {
  background: var(--terminal-bg-dim);
  border: 1px solid var(--terminal-border);
  color: var(--terminal-cyan);
  font-family: 'JetBrains Mono', monospace;
}
```

### Breadcrumb Path

```html
<span class="terminal-breadcrumb">
  <span class="hover:terminal-breadcrumb-link cursor-pointer">~</span>
  <span>/</span>
  <span class="hover:terminal-breadcrumb-link cursor-pointer">docs</span>
  <span>/</span>
  <span class="terminal-green">core</span>
  <span>/</span>
  <span class="text-terminal-text">signals</span>
  <span class="cursor-blink">_</span>
</span>
```

## Accessibility

- High contrast ratios maintained
- Keyboard navigation throughout
- Focus visible states
- Semantic HTML structure
- ARIA labels on all interactive elements

## Dark Mode

The terminal theme is inherently dark. Light mode maintains the terminal aesthetic with slightly muted colors.
