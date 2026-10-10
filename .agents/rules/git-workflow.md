# GIT AND VERCEL WORKFLOW RULES FOR CREACIONES E&G

Always follow these rules when completing tasks in this workspace:

1. **Pre-commit Verification:** Always run `npm run typecheck`, `npm run lint`, and `npm run build` to verify clean compilation before committing.
2. **Selective Staging:** Stage only relevant modified files for the task. Never commit `.env` files or credentials.
3. **Execution Command:** Use portable git with wincred helper:
   `$env:PATH = "c:\CreacionesEyG\git\cmd;" + $env:PATH; & "c:\CreacionesEyG\git\cmd\git.exe" push origin main`
4. **Verified Status:** Always confirm actual completion (exit code 0 and `Your branch is up to date with 'origin/main'`) before reporting success.
5. **Safety Enforcement:** Never use `git push --force`, `git reset --hard`, or `git clean -fd`.
