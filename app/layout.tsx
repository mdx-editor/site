import '@mdxeditor/editor/style.css'
import 'prism-themes/themes/prism-one-light.css'
import './globals.css'

import Logo from './images/MDXEditor.svg'
import GithubLogo from './images/github.svg'
import Link from 'next/link'
import Script from 'next/script'
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
  title: 'MDXEditor - the Rich Text Markdown Editor React Component',
  description:
    'MDXEditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`bg-white text-neutral-textContrast ${inter.variable} ${source.variable} ${ibmPlexMono.variable}`}>
      <body>
        <div className="lg:max-w-7xl 2xl:max-w-[90rem] mx-auto">
          <header className="lg:max-w-7xl 2xl:max-w-[90rem] mx-auto md:flex items-baseline px-4 pt-4 pb-2 border-neutral-border border-dashed border-b-[1px] [&_a:hover]:text-accent-text [&_a]:transition-colors gap-4 mb-2 md:mb-9">
            <Link href="/" className="block mb-4 md:mb-0">
              <Logo alt="MDXEditor" width={239} height={39} className="block translate-y-1" />
            </Link>
            <nav className="md:flex flex-grow font-mono font-normal pb-1">
              <ul className="md:flex gap-6 pb-4 lg:pb-0">
                <li>
                  <Link href="/editor/demo">Live demo</Link>
                </li>
                <li>
                  <Link href="/editor/docs/getting-started">Docs</Link>
                </li>
                <li>
                  <Link href="/editor/api/editor">API Reference</Link>
                </li>
              </ul>
              <Link href="https://github.com/mdx-editor/editor" className="flex items-center gap-1 ml-auto" title="The GitHub project">
                <GithubLogo width={14} height={14} alt="Github logo" />
                GitHub
              </Link>
            </nav>
          </header>
          <main className="py-2">{children}</main>
          <footer className="md:flex items-baseline px-4 pt-4 pb-2 border-neutral-border border-dashed border-t-[1px] [&_a:hover]:text-accent-text [&_a]:transition-colors gap-4 mt-9 mb-4 text-sm">
            <span className="block mb-2 md:mb-0">Copyright © 2023 Petyo Ivanov</span>
            <nav className="ml-auto">
              <ul className="flex gap-6">
                <li>
                  <a href="https://github.com/mdx-editor/editor">GitHub</a>
                </li>
                <li>
                  <a href="https://twitter.com/petyosi">Twitter</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/petyo/">LinkedIn</a>
                </li>
                <li>
                  <a href="mailto:petyo@virtuoso.dev">Email</a>
                </li>
              </ul>
            </nav>
          </footer>
        </div>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4B42VTN3FG" />
        <Script id="google-analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-4B42VTN3FG');
`}
        </Script>
      </body>
    </html>
  )
}

export default RootLayout
