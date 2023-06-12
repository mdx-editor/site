import { getDocs } from '@/app/getDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import { toMarkdown } from 'mdast-util-to-markdown'
import { frontmatter } from 'micromark-extension-frontmatter'
import { toc } from 'mdast-util-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
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
    <div className="flex gap-4 p-4">
      <div className="w-2/12 leading-8 ">
        <nav>
          <ul>
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  className="hover:text-accent-text transition-colors data-[current=true]:text-accent-text"
                  href={`/editor/docs/${doc.slug}`}
                  data-current={params.slug === doc.slug}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-grow prose w-7/12 max-w-full">
        <MDXRemote
          source={doc.content}
          options={{
            mdxOptions: { rehypePlugins: [rehypeSlug, rehypePrism] },
            parseFrontmatter: true,
          }}
        />
      </div>
      <div className="w-2/12">
        <div className="border-l-accent-solid border-dotted border-l-2 pl-2 font-light text-sm leading-7">
          <MDXRemote source={tocMarkdown} />
        </div>
      </div>
    </div>
  )
}
