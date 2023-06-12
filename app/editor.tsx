'use client'
import dynamic from 'next/dynamic'

const MDXEditor = dynamic(() => import('mdxeditor').then((mod) => mod.MDXEditor), { ssr: false })
export default MDXEditor
