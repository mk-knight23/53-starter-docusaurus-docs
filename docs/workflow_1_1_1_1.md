# Development Workflow

## Pre-Development Checklist

- [ ] Create feature branch from main
- [ ] Pull latest changes
- [ ] Check Node.js version (20+ LTS)

## Development Steps

1. **Start Dev Server**
   ```bash
   ng serve
   ```

2. **Create/Edit Content**
   - Add `.md` files to `public/content/`
   - Update sidebar in `content.service.ts`

3. **Build Verification**
   ```bash
   ng build --configuration production
   ```

4. **Test Changes**
   - Check all routes load
   - Verify search works
   - Test mobile responsive
   - Verify SEO meta tags

## Pre-Commit Checklist

- [ ] Code compiles without errors
- [ ] No console warnings
- [ ] All links work
- [ ] Content proofread
- [ ] Bundle size acceptable (<500kB initial)

## Commit Message Format

```
type(scope): description

# Type: feat, fix, docs, refactor, chore

# Examples:
feat(content): add search functionality
fix(routing): correct lazy loading path
docs(readme): update deployment instructions
```

## Deployment Process

1. Push to main branch
2. GitHub Actions auto-deploys
3. Verify on GitHub Pages
4. Check production URL

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
ng build
```

### Routes Not Working
- Check `app.routes.ts`
- Verify component paths
- Clear browser cache

### Search Not Working
- Rebuild search index
- Check content files exist
- Verify browser console for errors
