# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Open items (unverified, do not treat as done)

- **Design/code review subagents are broken.** The agent config points at `github-copilot/claude-sonnet-4.5`, which does not exist — every subagent dispatch fails with `Model not found`. Fix in `~/.config/opencode/opencode.jsonc`. Until then there is no independent review verdict available.
- **The About redesign has never received a `ship` verdict.** A review pass returned `fix` with six findings; all six were applied and self-verified with Playwright geometry and computed styles, but the confirming review could not be dispatched. The verification was self-performed, not independently reviewed.
- **`.hero-shell` residual references are unconfirmed.** The class was removed from `App.tsx` and its CSS rule deleted from `index.css`, but the repo-wide grep never ran (`rg` is not on PATH on this machine). Confirm with `Select-String` or install `ripgrep` before assuming it is fully gone.

