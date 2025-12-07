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

Open [http://localhost:3000](http://localhost:3000) to view your storefront.

---

## 🔌 API Integration

This sample demonstrates a full integration with Droplinked’s Public APIs.

### Authentication

Every API request must include your API key:

```
x-droplinked-api-key: YOUR_API_KEY
```


### API Documentation

Full API Reference:
🔗 `https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference` 

---

## 📄 License

This sample project is provided for demonstrating Droplinked API integration.

## 🔗 Resources

* `https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/` 
* `https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference` 
* `https://droplinked.com/` 

## 💬 Support

* `https://droplinked.com/`
