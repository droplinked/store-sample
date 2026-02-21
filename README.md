# Droplinked Store Sample

A simple Next.js storefront example showing how to build an online shop using **Droplinked Public APIs**.
This sample helps you quickly understand how to integrate products, carts, and shop data using Droplinked.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your API Key

1. Go to the `https://droplinked.com/` 
2. Open **Settings → Developers**
3. Create a new API key
   (Guide: `https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/getting-started` )

### 3. Configure Environment

Create a `.env` file with the following variables:

```env
# Server-side only variables (NEVER expose these to the browser)
API_URL=https://api.io.droplinked.com
API_KEY=your_api_key_here

# Public variables (safe to expose to the browser)
NEXT_PUBLIC_SHOP_NAME=your_shop_name
```

**⚠️ Security Notice:** 
- `API_KEY` and `API_URL` must NOT be prefixed with `NEXT_PUBLIC_`. These are server-side only.
- Only `NEXT_PUBLIC_SHOP_NAME` should be public as it's needed for client-side rendering.
- All API requests are proxied through `/api/proxy` to keep your API key secure.

### 4. Run the Store

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your storefront.

---

## 🔌 API Integration

This sample demonstrates a full integration with Droplinked's Public APIs.

### Authentication

API requests are authenticated server-side via the proxy route. The API key is:
- Stored securely in server-side environment variables (`API_KEY`)
- Never exposed to the browser or client-side JavaScript
- Added to requests via the `/api/proxy` route

### Security Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  Next.js    │────▶│  Droplinked │
│  (Client)   │◄────│   Proxy     │◄────│    API      │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  API_KEY    │
                    │ (Server-side│
                    │    only)    │
                    └─────────────┘
```

### API Documentation

Full API Reference:
🔗 [Droplinked API Reference](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference)

---

## 📄 License

This sample project is provided for demonstrating Droplinked API integration.

## 🔗 Resources

* [Droplinked API Guide](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/)
* [Droplinked API Reference](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference)
* [Droplinked Dashboard](https://droplinked.com/)

## 💬 Support

* [Droplinked Dashboard](https://droplinked.com/)
