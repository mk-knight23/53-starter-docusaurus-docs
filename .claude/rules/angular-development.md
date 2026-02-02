# Angular Development Rules

## Code Style

- Use **standalone components** exclusively
- Prefer **Signals** over RxJS for local state
- Use **strict TypeScript** mode
- Implement **OnPush** change detection by default
- Use **dependency injection** with inject() function

## Component Guidelines

```typescript
// GOOD: Standalone component with inject()
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: \`...\`
})
export class ExampleComponent {
  private service = inject(ServiceName);
}

// BAD: Non-standalone, constructor injection
@Component({
  selector: 'app-example',
  // standalone: false
})
export class ExampleComponent {
  constructor(private service: ServiceName) {}
}
```

## File Organization

```
src/
├── app/
│   ├── features/
│   │   └── feature-name/
│   │       ├── components/
│   │       ├── services/
│   │       └── types/
│   ├── shared/
│   │   ├── components/
│   │   └── utils/
│   └── core/
│       └── services/
```

## Signals Best Practices

- Use signals for primitive values
- Use computed for derived values
- Use effects for side effects only
- Never call signals in templates without ()

```typescript
// GOOD
count = signal(0);
doubleCount = computed(() => count() * 2);

// BAD
count = 0;
get doubleCount() { return this.count * 2; }
```

## Content Authoring

- Place Markdown files in `public/content/`
- Use lowercase filenames with underscores
- Add frontmatter for metadata:
```markdown
# Title

Description...

## Features
- Feature 1
- Feature 2
```

## Build Verification

Before committing:
1. `ng build` must succeed
2. No TypeScript errors
3. Bundle size under 500kB initial
4. All routes load successfully

## Testing

- Unit tests: `ng test`
- E2E tests: `ng e2e`
- Minimum 80% coverage required
