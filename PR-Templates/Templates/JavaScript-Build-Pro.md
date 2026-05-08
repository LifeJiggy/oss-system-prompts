# Pull Request: JavaScript Build Engineer

> JavaScript build and bundling PR template.

---

## PR Overview

### Summary
<!-- Description of build changes -->

### Build Tools
- [ ] Webpack
- [ ] Vite
- [ ] esbuild
- [ ] Rollup
- [ ] Parcel

---

## Build Configuration

### webpack.config.js / vite.config.ts
```javascript
export default {
  entry: './src/index.ts',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  }
};
```

---

## Build Testing

```bash
npm run build
npm run dev
npm run preview
```

---

*End of JavaScript Build PR Template*