import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { Inter, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const source = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '300', '200'],
  variable: '--font-ibm-plex-mono',
})

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'MDX Editor - the Rich Text Markdown Editor React Component',
  description:
    'mdxeditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`bg-neutral-base text-neutral-textContrast ${inter.variable} ${source.variable} ${ibmPlexMono.variable}`}>
      <body>
        <header className="lg:max-w-6xl mx-auto flex items-baseline px-4 pt-4 pb-2 border-accent-solid border-dotted border-b-2 [&_a:hover]:text-accent-text [&_a]:transition-colors gap-4 mb-9">
          <Link href="/" className="flex-grow-0">
            <Image src="/MDXEditor.svg" alt="MDX Editor" width={239} height={39} />
          </Link>
          <nav className="flex flex-grow font-mono font-normal">
            <ul className="flex gap-4">
              <li>
                <Link href="/">Live demo</Link>
              </li>
              <li>
                <Link href="/">Docs</Link>
              </li>
            </ul>
            <Link href="https://github.com" className="flex items-center gap-1 ml-auto">
              <Image src="/github.svg" width={14} height={14} alt="Github logo" />
              GitHub
            </Link>
          </nav>
        </header>
        <main className="py-2 lg:max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
export default RootLayout
