import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="bg-white border-t border-slate-200 py-16"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
          aria-label="Footer navigation"
        >
          <section aria-labelledby="footer-shop">
            <h3
              id="footer-shop"
              className="text-slate-900 text-lg font-bold mb-4"
            >
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-support">
            <h3
              id="footer-support"
              className="text-slate-900 text-lg font-bold mb-4"
            >
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-company">
            <h3
              id="footer-company"
              className="text-slate-900 text-lg font-bold mb-4"
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-connect">
            <h3
              id="footer-connect"
              className="text-slate-900 text-lg font-bold mb-4"
            >
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                  aria-label="Follow us on Twitter"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                  aria-label="Follow us on LinkedIn"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-slate-600 hover:text-slate-900 transition-colors rounded px-1 py-1"
                  aria-label="Subscribe to our YouTube channel"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </section>
        </nav>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 Store Sample. All rights reserved.
          </p>
          <nav className="flex gap-8" aria-label="Legal">
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm rounded px-2 py-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm rounded px-2 py-1"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
