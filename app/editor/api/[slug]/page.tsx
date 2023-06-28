/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { getApiDocs } from '@/app/getApiDocs'
import { ApiNav } from './Nav'

export function generateStaticParams() {
  return [{ slug: 'index' }]
}

interface PageParams {
  slug: string
}

export default function Page({ params }: { params: PageParams }) {
  const docs = getApiDocs('./api-ref')
  return <ApiNav root={docs.root.packages[0]} />
}
