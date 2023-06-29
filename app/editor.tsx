'use client'
import dynamic from 'next/dynamic'

const MDXEditor = dynamic(() => import('@mdxeditor/editor').then((mod) => mod.MDXEditor), { ssr: false })
export default MDXEditor
