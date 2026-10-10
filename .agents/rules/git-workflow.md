# GIT AND VERCEL WORKFLOW RULES FOR CREACIONES E&G

Always follow these rules when completing tasks in this workspace:

1. **Pre-commit Verification:** Always run `npm run typecheck`, `npm run lint`, and `npm run build` to verify clean compilation before committing.
2. **Selective Staging:** Stage only relevant modified files for the task. Never commit `.env` files or credentials.
3. **Automatic Push:** Execute `git push origin main` after clean verification.
4. **Safety Enforcement:** Never use `git push --force`, `git reset --hard`, or `git clean -fd`.
