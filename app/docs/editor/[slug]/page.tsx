import { getDocs } from '@/app/getDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
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

  return (
    <MDXRemote
      options={{
        parseFrontmatter: true,
      }}
      source={doc?.content}
    />
  )
}
