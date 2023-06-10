import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'MDX Editor - the Rich Text Markdown Editor React Component',
  description:
    'mdxeditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="bg-slate-50">
      <body>
        <header className="lg:max-w-6xl mx-auto flex items-baseline px-4 pt-4 pb-2 border-blue-400 border-dotted border-b-[1px] [&_a:hover]:text-blue-700 [&_a]:transition-colors gap-4 mb-9">
          <Link href="/" className="flex-grow-0">
            <Image src="/MDXEditor.svg" alt="MDX Editor" width={239} height={39} />
          </Link>
          <nav className="flex flex-grow font-mono">
            <ul className="flex gap-4">
              <li>
                <Link href="/">Live demo</Link>
              </li>
              <li>
                <Link href="/">Docs</Link>
              </li>
            </ul>
          </nav>
          <Link href="https://github.com" className="flex items-center gap-1 font-mono">
            <Image src="/github.svg" width={14} height={14} alt="Github logo" />
            GitHub
          </Link>
        </header>
        <main className="py-2 lg:max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
export default RootLayout
