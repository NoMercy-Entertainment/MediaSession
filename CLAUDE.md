# NoMercy Media Session

Thin Media Session API wrapper for web platforms.

## Tech Stack
- TypeScript (ES2020), plain `tsc` build, outputs ESM
- Testing: Jest + ts-jest
- Linting: ESLint 8 with @typescript-eslint

## Structure
```
src/
  index.ts        # Full implementation + public API
  index.test.ts   # Tests
```

## Conventions
- npm scope: `@nomercy-entertainment/media-session`
- Module type: ESM (`"type": "module"`)

## Rules
- This is a minimal wrapper. Keep it thin and focused on the Media Session API.
- Run `npx jest` before committing changes.
