import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.scss'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Develop Store | The best E-Commerce',
  description:
    'Develop Store is the best E-Commerce platform offering a wide range of products.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* PWA */}
        <meta name="theme-color" content="#000000" />
        <link
          rel="manifest"
          href="/manifest.webmanifest"
          crossOrigin="use-credentials"
        />

        {/* SEO */}
        <meta name="author" content="Miguel Zacca" />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
        <link rel="robots" href="/robots.txt" />
        <link rel="canonical" href="https://developstore.vercel.app" />
        <meta
          name="description"
          content="Develop Store is the best E-Commerce platform offering a wide range of products."
        />
        <meta
          name="keywords"
          content="e-commerce, online store, buy online, Develop Store"
        />

        {/* ICON */}
        <link rel="icon" href="/images/window-logo.png" type="image/png" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
