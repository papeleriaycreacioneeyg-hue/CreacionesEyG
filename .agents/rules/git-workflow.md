# GIT, VERCEL AND SDD WORKFLOW RULES FOR CREACIONES E&G

Always follow these rules when working and completing tasks in this workspace:

1. **Spec-Driven Development (SDD):**
   - For planned features: follow the 16-step flow (Spec ➔ Technical Plan ➔ Atomic Tasks ➔ User Approval ➔ Implementation ➔ Quality Gates ➔ Verification).
   - For urgent hotfixes: follow the 10-step flow (Diagnostic ➔ Hotfix Record ➔ Root Cause ➔ Minimal Fix ➔ Validation ➔ Production Verification). Never use hotfixes to bypass security or testing.

2. **Pre-commit Verification (Quality Gates):**
   - Run `npm run typecheck` (0 errors).
   - Run `npm run lint` (0 errors, 0 warnings).
   - Run `npm run test` (all existing tests must pass).
   - Run `npm run build` (clean production build).

3. **Selective Staging:**
   - Stage only relevant modified files for the task (`git add <files>`).
   - Never commit `.env` files, secrets, or private credentials.

4. **Execution Command:**
   - Use portable git with wincred helper:
     `$env:PATH = "c:\CreacionesEyG\git\cmd;" + $env:PATH; & "c:\CreacionesEyG\git\cmd\git.exe" push origin main`

5. **Verified Status:**
   - Always confirm actual completion (exit code 0 and `Your branch is up to date with 'origin/main'`) before reporting success.
   - Verify deployment status in Vercel (`Ready` / `Success`) on the live domain.

6. **Safety Enforcement:**
   - Never use `git push --force`, `git reset --hard`, or `git clean -fd`.
   - Never discard local modifications or user pending work.
   - Never alter the middleware runtime without an approved technical specification and documented justification.
