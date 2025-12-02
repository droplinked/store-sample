# Droplinked Store Sample

A modern, production-ready e-commerce storefront built with Next.js 16, React 19, and TypeScript. This sample store demonstrates best practices for building scalable, performant online stores with the Droplinked platform.

## ✨ Features

- 🛍️ **Complete E-commerce Functionality**
  - Product browsing with pagination and filtering
  - Product detail pages with SKU selection
  - Shopping cart management
  - Multi-currency support with configurable formatting
  
- ⚡ **Performance Optimized**
  - Server-side rendering (SSR) and static generation
  - Optimized images with Next.js Image component
  - Code splitting and lazy loading
  - Web Vitals monitoring

- 🎨 **Modern UI/UX**
  - Responsive design with Tailwind CSS v4
  - Smooth animations with Framer Motion
  - Toast notifications for user feedback
  - Loading states and skeletons
  - Error boundaries for graceful error handling

- 🔧 **Developer Experience**
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Vitest for unit testing
  - Husky and lint-staged for git hooks
  - Conventional commits with commitlint

- 🏗️ **Architecture**
  - State management with Zustand
  - Form validation with React Hook Form and Zod
  - API client with error handling and retry logic
  - Modular component structure

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A Droplinked shop account

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd store-sample
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Get Your API Key

Before configuring the environment, you need to create an API key:

1. Go to [Droplinked Dashboard](https://droplinked.com/)
2. Log in with your account credentials
3. Navigate to **Settings → Developers**
4. In the API Keys tab, create a new key

> ⚠️ **Keep your API key secure** — it identifies and authenticates your requests to Droplinked's backend.

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Droplinked API Base URL
NEXT_PUBLIC_API_URL=https://api.io.droplinked.com

# Your Droplinked API Key (from Dashboard)
NEXT_PUBLIC_API_KEY=your_api_key_here

# Your Shop Name
NEXT_PUBLIC_SHOP_NAME=your_shop_name
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (proxy)
│   ├── cart/              # Shopping cart pages
│   ├── products/          # Product listing and detail pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── cart/             # Cart-related components
│   ├── common/           # Shared components (Header, Footer, etc.)
│   ├── home/             # Home page sections
│   └── product/          # Product components
├── lib/                   # Core utilities and logic
│   ├── api/              # API clients and data fetching
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🎨 Styling

This project uses **Tailwind CSS v4** with a custom configuration. Styles are organized as follows:

- `app/globals.css` - Global styles and Tailwind directives
- Component-level styles using Tailwind utility classes
- `class-variance-authority` for component variants
- `tailwind-merge` and `clsx` for conditional classes

## 🔌 API Integration

This project integrates with the [Droplinked API](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/) to provide comprehensive e-commerce functionality.

### Base URL

All API requests are made to:
```
https://api.io.droplinked.com
```

### Authentication

Every API request must include your API key in the header:
```
x-droplinked-api-key: YOUR_API_KEY
```

### API Modules

The store integrates with the following Droplinked API modules:

- **User Management** - User registration, authentication, and account management
- **Product Management** - Create, edit, and organize products within stores
- **Cart & Order Management** - Cart creation, order placement, and order tracking
- **Payment Management** - Process payments through traditional and Web3 methods
- **Shipping Management** - Configure and manage delivery methods
- **Blog Management** - Create and manage content for storefronts

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

## 🗄️ State Management

State is managed using **Zustand** with the following stores:

- **shopStore** - Shop configuration, currency, and theming
- **useCart** - Cart items and operations (add, remove, update quantities)

Stores are persisted to localStorage for a seamless user experience.

## 🧪 Testing

Tests are written using **Vitest** and **React Testing Library**:

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test files are located in the `__tests__` directory.

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Node.js

Build the application with `npm run build` and deploy the `.next` directory.

## 🌐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------||
| `NEXT_PUBLIC_API_URL` | Droplinked API base URL | Yes | `https://api.io.droplinked.com` |
| `NEXT_PUBLIC_API_KEY` | Your Droplinked API key | Yes | - |
| `NEXT_PUBLIC_SHOP_NAME` | Your Droplinked shop name | Yes | - |
| `NEXT_PUBLIC_USE_PROXY` | Enable API proxy | No | `false` |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics ID | No | - |

## 🎯 Key Features Explained

### SKU Selection
Products with multiple variants (size, color, etc.) use the `SKUSelector` component which:
- Automatically detects available attributes
- Handles color swatches and size options
- Matches user selections to available SKUs
- Validates attribute combinations

### Currency Formatting
Prices are formatted according to shop configuration:
- Respects decimal places
- Uses custom thousands separators
- Handles currency symbol placement
- Supports international formats

### Error Handling
Robust error handling throughout:
- Error boundaries catch component errors
- API errors are logged and displayed with user-friendly messages
- Toast notifications for user actions
- Fallback UI for error states

### Performance Monitoring
Built-in Web Vitals tracking:
- Reports Core Web Vitals (LCP, FID, CLS)
- Custom performance marks
- Integration-ready for analytics platforms

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

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

For issues or questions:
- Check the [Droplinked API Documentation](https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/)
- Explore the [API Reference](https://apiv3.droplinked.com/swagger/dev-docs)
- Open an issue on GitHub
- Contact Droplinked support

---

Built with ❤️ using Next.js and Droplinked
