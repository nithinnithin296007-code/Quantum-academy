# Claude / Agent Guidelines - Quantum Academy

Guidelines, build commands, and security checklists for development.

## Build and Development Commands
- Start dev server: `npm run dev`
- Build the app: `npm run build`
- Run linting checks: `npm run lint` (using oxlint)
- Preview production build: `npm run preview`

## Code Style & Architecture
- **Framework**: React (v19) + Vite, React Router DOM (v7).
- **Styling**: Tailwind CSS (v4) with `@theme` configurations in `src/index.css`.
- **Animations**: Framer Motion for component transitions, GSAP for timeline animations, and Lenis for smooth scroll.
- **Reusability**: Keep components modular. Centralize shared custom hooks in `src/hooks/` and helper utilities in `src/utils/`.
- **Forms**: Use `react-hook-form` and handle submissions directly via frontend routes (e.g. WhatsApp redirects) or validated endpoints.

---

## Security Checklist for AI-Generated Code

### 1. Secrets and Environment Variables
- **Never expose secrets in frontend code**: All private keys, API tokens, database passwords, and client-sensitive secrets belong in `.env.local` (and must be added to Vercel/Netlify hosting variables).
- **No Hardcoded Keys**: Never write `const API_KEY = "..."` directly in client-side JS/JSX.
- **Vite Env Prefix**: Only prefix variables with `VITE_` if they are public keys intentionally exposed (e.g. public tracking tokens). Ensure `.env`, `.env.local`, and `.env.*.local` are listed in `.gitignore`.
- Always generate a `.env.example` file showing the required variables with empty values.

### 2. Rate Limiting (Server / API Boundary)
- Apply rate limiting to all public-facing backend endpoints (if added in future API routes):
  - Auth routes: 5 requests per 15 minutes per IP.
  - General API: 60 requests per minute per IP.
  - AI Proxy endpoints: 10 requests per minute per user.
- Always return `429 Too Many Requests` with a `Retry-After` header when limits are hit.

### 3. Input Validation and Sanitization
- Validate and sanitize all user input on the server/API layer. Do not rely solely on client-side checks.
- Use robust schema validation libraries (e.g., Zod, Joi, or Pydantic) to assert types, lengths, formatting, and enum matches.
- Prevent SQL/NoSQL Injection: Always use parameterization or ORMs (Prisma, Drizzle, etc.). Never concatenate user input directly into queries.
- Validate file uploads: Assert file size limits, verify MIME types, and restrict allowed file extensions on the server.

### 4. Authentication and Authorization
- Use established auth libraries (NextAuth, Clerk, Supabase Auth, Auth0) instead of custom implementations.
- Never store raw passwords. Use `bcrypt` (min cost 12) or `argon2`.
- JWTs must be signed using strong environment variables (min 32 characters) with short expiration times (15 to 60 mins).
- Store refresh tokens in `httpOnly` secure cookies, never in local/session storage.
- Check both user authentication status and resource ownership/permissions on every state-changing request.

### 5. CORS Configuration
- **No Wildcard CORS in Production**: Explicitly whitelist trusted origins.
- Restrict HTTP methods (`GET`, `POST`, etc.) to only what each endpoint needs.

### 6. HTTP Security Headers
- Ensure standard security headers are set using `helmet` or platform configurations:
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options: DENY` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security` (forces HTTPS)
- Disable the `X-Powered-By` header to prevent server technology leakage.

### 7. File Upload Security
- Sanitize and rename uploaded files using a UUID or hashed filename. Never preserve the user's original filename directly.
- Store user-uploaded files outside the web root (e.g. S3, Google Cloud Storage, Cloudinary).
- Never grant execute permissions to uploaded file paths.

### 8. Error Handling and Logging
- **Never return raw database errors or stack traces to the client**: Expose generic user-friendly messages ("Something went wrong") and log full diagnostic error context (sanitized input, timestamp, user ID, trace) server-side only.
- Use a dedicated logging and tracking platform in production (e.g. Sentry, Datadog).

### 9. Dependency Security
- Periodically check for dependency vulnerabilities using `npm audit`. Fix high and critical issues.
- Pin specific package versions in production package configs (`package-lock.json`).

### 10. XSS Prevention
- Never render user-generated raw HTML content. Avoid using `dangerouslySetInnerHTML` in React unless the content has been rigorously sanitized using `DOMPurify`.
- Avoid using JavaScript's dynamic compilation features (`eval()`, `new Function()`, or `innerHTML` injections).

### 11. Deploy Checklist
- [ ] No `.env` files are committed to Git.
- [ ] Production secrets are safely set in the hosting environment variables.
- [ ] Debug/developer modes and verbose console logging are disabled in production.
- [ ] Database ports are protected and not publicly exposed.
- [ ] HTTPS is enforced sitewide.
- [ ] Rate limits are active.

### 12. AI and LLM Specific Checks
- Treat LLM outputs and prompt responses as untrusted data. Sanitize output markup before rendering to prevent XSS.
- Never place LLM API keys on the client-side. Route all AI requests through your backend proxy.
- Set strict `max_tokens` limits to avoid billing/runaway cost issues.
- Set per-user token budgets to prevent cost-exhaustion attacks.
