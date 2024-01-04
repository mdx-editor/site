'use client'
import React from 'react'
import ExpandMoreIcon from '@/app/images/expand_more.svg'
import ExpandLessIcon from '@/app/images/expand_less.svg'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface NavLink {
  label: string
  location: string
}

interface NavGroup {
  title: string
  links: NavLink[]
}

export default function NavGroup({ group }: { group: NavGroup }) {
  let slugParam = useParams().slug
  if (typeof slugParam === 'string') {
    slugParam = [slugParam]
  }
  const slug = (slugParam ?? []).join('/')

  const [expanded, setExpanded] = React.useState(() => {
    const currentLocation = `/editor/api/${slug}`
    return group.links.some(({ location }) => location === currentLocation)
  })

  return (
    <dl>
      <dt className="flex items-center cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        {group.title}
        {expanded ? <ExpandLessIcon className="ml-auto" /> : <ExpandMoreIcon className="ml-auto" />}
      </dt>
      {expanded &&
        group.links.map(({ location, label }, index) => {
          return (
            <dd key={index}>
              <Link href={location}>{label}</Link>
            </dd>
          )
        })}
    </dl>
  )
}
