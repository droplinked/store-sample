# Frontend Security Fixes
**Epic:** Droplinked Security Findings Mitigation (Storefront & Client Domain)
**Context:** These tasks address the remaining vulnerabilities from `Droplinked-SECURITY-FINDINGS-SUMMARY.md` that must be fixed inside the Next.js Storefront repository.

---

## 🎟️ Ticket 1: Update Next.js Version (CRIT-1)
**Goal:** Patch CVE-2026-23864 Next.js HTTP Request Deserialization DoS.
**Assignee:** Frontend Developer

### Tasks:
1. Update Next.js to version `16.0.11` or higher in `package.json`.
2. Run `npm install` or `yarn install`.
3. Verify the build succeeds and no regressions exist in the app router.

---

## 🎟️ Ticket 2: Secure API Proxy & Hide API Key (CRIT-3 & HIGH-1)
**Goal:** Stop exposing the Droplinked API key to the browser and block unauthorized backend enumeration through the proxy.
**Assignee:** Frontend Developer

### Tasks:
1. **Remove Public Key:**
   - In `.env.local` and Vercel/hosting env settings, rename `NEXT_PUBLIC_DROPLINKED_API_KEY` to `DROPLINKED_API_KEY` (removing the `NEXT_PUBLIC_` prefix). This ensures the key is never bundled in client JS.
2. **Restrict Proxy Allowlist (HIGH-1):**
   - Open the Next.js API route handling the proxy (e.g., `app/api/proxy/route.ts` or `pages/api/proxy.ts`).
   - Define an array of allowed paths or a regex whitelist (e.g., `['/v2/carts', '/v2/products']`).
   - Before forwarding the request, check if the requested path matches the allowlist. Return `403 Forbidden` if it doesn't.
3. **Inject API Key Server-Side:**
   - In the same proxy route, inject the `DROPLINKED_API_KEY` into the headers (`x-api-key`) *before* proxying the request to `apiv3.droplinked.com`.

---

## 🎟️ Ticket 3: HTTP Security Headers & S3 Patterns (HIGH-3, HIGH-4, LOW-1, LOW-2)
**Goal:** Add browser-enforced security headers and restrict image loading sources.
**Assignee:** Frontend Developer

### Tasks:
1. **Security Headers in `next.config.js`:**
   - Add a `headers()` async function to `next.config.js`.
   - Implement `Strict-Transport-Security` (HSTS) with `max-age=63072000; includeSubDomains; preload`. (HIGH-3)
   - Implement `Content-Security-Policy` (CSP) preventing execution of inline scripts and unauthorized connections. (HIGH-4)
   - Implement `X-Content-Type-Options: nosniff`. (LOW-1)
2. **Restrict Remote Images (LOW-2):**
   - In `next.config.js`, update the `images.remotePatterns` array.
   - Remove wildcard domains like `**.s3.amazonaws.com`.
   - Explicitly list *only* the specific S3 buckets owned by Droplinked (e.g., `droplinked-assets.s3.amazonaws.com`).

---

## 🎟️ Ticket 4: Implement Zod Validation for I/O and State (MED-1, MED-2, MED-3)
**Goal:** Prevent XSS, state tampering, and malformed requests by sanitizing inputs and parsing API responses.
**Assignee:** Frontend Developer

### Tasks:
1. **Validate API Responses (MED-3):**
   - Whenever fetching data from the API proxy, use Zod schemas (e.g., `CartSchema.parse(data)`) to validate the shape of the JSON response before rendering it in React. Strip out unknown properties.
2. **Validate URL Params (MED-2):**
   - Before interpolating values like `shopName`, `cartId`, or `skuId` into API URLs, validate their format using Regex or Zod (e.g., ensure `shopName` is alphanumeric, `cartId` is a valid string, etc.).
3. **Validate LocalStorage Hydration (MED-1):**
   - When loading `shopData` or cart state from `localStorage`, run it through a Zod parse function. If the data is tampered with or malformed, discard it and return the default initial state instead of crashing or accepting dirty data.

---

## 🎟️ Ticket 5: Add Security ESLint Rules (MED-4)
**Goal:** Prevent insecure coding practices via static analysis.
**Assignee:** Frontend Developer

### Tasks:
1. Install `eslint-plugin-security` in the frontend project.
2. Add `"plugin:security/recommended"` to the ESLint config (`.eslintrc.json`).
3. Fix any newly discovered warnings (e.g., avoiding `dangerouslySetInnerHTML` unless strictly necessary and sanitized).