# Droplinked Store Sample

A Next.js e-commerce storefront demonstrating how to integrate with the Droplinked API. Get a fully functional online store running in minutes.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your API Key

1. Go to [Droplinked Dashboard](https://droplinked.com/)
2. Navigate to **Settings → Developers**
3. Create a new API key

### 3. Configure Environment

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=https://api.io.droplinked.com
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_SHOP_NAME=your_shop_name
```

### 4. Run the Store

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your store.

---

## 🔌 API Integration

This store demonstrates a complete integration with the Droplinked API. Here's how it works:

### Authentication

Every API request must include your API key in the header:
```
x-droplinked-api-key: YOUR_API_KEY
```

### Implementation

The store uses the following API clients:

- **ApiClient** (`lib/api/client.ts`) - Core HTTP client with authentication and error handling
- **Product API** (`lib/api/products.ts`) - Product fetching and search
- **Cart API** (`lib/api/cart.ts`) - Cart operations (add, remove, update)
- **Shop API** (`lib/api/shop.ts`) - Shop configuration and settings

### API Documentation

Explore the full API specification using Swagger:
🔗 [https://apiv3.droplinked.com/swagger/dev-docs](https://apiv3.droplinked.com/swagger/dev-docs)

### API Proxy

The project includes an optional API proxy (`app/api/proxy/route.ts`) to handle CORS and add security headers. Enable it by setting `NEXT_PUBLIC_USE_PROXY=true`.

## 📄 License

This project is provided as a sample for Droplinked integration.

## 🔗 Resources

- [Droplinked API Documentation](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/)
- [Droplinked API Reference (Swagger)](https://apiv3.droplinked.com/swagger/dev-docs)
- [Droplinked Dashboard](https://droplinked.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 💬 Support

- [API Documentation](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/)
- [API Reference](https://apiv3.droplinked.com/swagger/dev-docs)
- [Droplinked Dashboard](https://droplinked.com/)

---

Built with Next.js 16, React 19, and TypeScript
