# Gen AI

This folder is a sibling to the PlayWright workspace and is for generative-AI experiments, demos, and utilities.

It contains a small Playwright example in `examples/` that you can run with the commands in the original PlayWright workspace (it uses the same project `node_modules`).

Quick run steps (PowerShell):

```powershell
# from the PlayWright project root
npm install
npx playwright install
npx playwright test "..\Gen AI\examples\genai-playwright.spec.js"
```
