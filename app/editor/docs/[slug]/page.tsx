import { getDocs } from '@/app/getDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import { toMarkdown } from 'mdast-util-to-markdown'
import { frontmatter } from 'micromark-extension-frontmatter'
import { toc } from 'mdast-util-toc'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import { DocsLayout } from '../../DocsLayout'
/* eslint-disable react-refresh/only-export-components */

export function generateStaticParams() {
  const docs = getDocs('./docs')

  return docs.map((document) => ({
    slug: document.slug,
  }))
}

interface PageParams {
  slug: string
}

export function generateMetadata({ params }: { params: PageParams }) {
  const docs = getDocs('./docs')
  const doc = docs.find((doc) => doc.slug === params.slug)!
  return {
    title: `${doc.title} | MDXEditor`,
    description:
      'MDXEditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
  }
}

export default function Page({ params }: { params: PageParams }) {
  const docs = getDocs('./docs')
  const doc = docs.find((doc) => doc.slug === params.slug)!

  const tree = fromMarkdown(doc.content, {
    extensions: [frontmatter()],
    mdastExtensions: [frontmatterFromMarkdown('yaml')],
  })

  const tocTree = toc(tree)
  const tocMarkdown = toMarkdown(tocTree.map!.children[0].children[1]!)

  return (
    <DocsLayout
      nav={
        <nav className="doc-nav">
          <ul>
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/editor/docs/${doc.slug}`} data-current={params.slug === doc.slug}>
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      }
      content={
        <MDXRemote
          source={doc.content}
          options={{
            mdxOptions: { rehypePlugins: [rehypeSlug, rehypePrism] },
            parseFrontmatter: true,
          }}
        />
      }
      pageNav={<MDXRemote source={tocMarkdown} />}
    />
  )
}
