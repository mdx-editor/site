'use client'
import { ApiRefNode, TypeFieldMap, RefNodeField, MarkdownApiRefDocument } from '@/app/apiDocsStructures'
import React from 'react'
import ExpandMoreIcon from '@/app/images/expand_more.svg'
import ExpandLessIcon from '@/app/images/expand_less.svg'

function nodeTitle(node: ApiRefNode) {
  if (node.document.title === 'editor') {
    return '@mdxeditor/editor package'
  }

  if (node.document.type === 'property' || node.document.type === 'method') {
    return node.document.title.split('.').at(-1)
  }
  return node.document.title
}

const ExpandedNodesContext = React.createContext<{ expandedNodes: Set<string>; toggle: (path: string) => void; currentDocSlug: string }>({
  expandedNodes: new Set<string>(),
  currentDocSlug: '',
  toggle: () => {
    throw new Error('implement this')
  },
})

const ApiRefNodeNav: React.FC<{ node: ApiRefNode }> = ({ node }) => {
  const { expandedNodes, toggle, currentDocSlug } = React.useContext(ExpandedNodesContext)

  return node.document.type === 'interface' || node.document.type === 'variable' ? (
    <InterfaceRefNodeNav node={node} />
  ) : node.document.type === 'class' ? (
    <ClassRefNodeNav node={node} />
  ) : (
    <>
      <a href={node.document.slug} data-current={currentDocSlug == node.document.slug}>
        {nodeTitle(node)}
      </a>
      <dl>
        {node.constructorNode && (
          <dt>
            <a href={node.constructorNode?.document.slug}>constructor</a>
          </dt>
        )}
        {Object.values(TypeFieldMap)
          .filter((value) => value !== 'constructor')
          .map((fieldName, index) => {
            const expandKey = `${node.document.slug}.${fieldName}`
            const isExpanded = expandedNodes.has(expandKey)
            return node[fieldName] ? (
              <React.Fragment key={index}>
                <dt className="flex items-center cursor-pointer" onClick={() => toggle(expandKey)}>
                  {fieldName.replace(/./, (c) => c.toUpperCase())}
                  {isExpanded ? <ExpandLessIcon className="ml-auto" /> : <ExpandMoreIcon className="ml-auto" />}
                </dt>
                {isExpanded &&
                  node[fieldName as Exclude<RefNodeField, 'constructor'>]!.map((child: ApiRefNode, index: number) => {
                    return (
                      <dd key={index} className="pl-2">
                        <ApiRefNodeNav node={child} />
                      </dd>
                    )
                  })}
              </React.Fragment>
            ) : null
          })}
      </dl>
    </>
  )
}

const InterfaceRefNodeNav: React.FC<{ node: ApiRefNode }> = ({ node }) => {
  const { expandedNodes, currentDocSlug } = React.useContext(ExpandedNodesContext)
  const isExpanded = expandedNodes.has(node.document.slug)

  return (
    <>
      <div className="flex items-center mb-3">
        <a href={node.document.slug} data-current={currentDocSlug === node.document.slug}>
          {nodeTitle(node)}
        </a>
        {node.properties && (isExpanded ? <ExpandLessIcon className="ml-auto" /> : <ExpandMoreIcon className="ml-auto" />)}
      </div>
      {isExpanded && node.properties && (
        <dl>
          {node.properties.map((child: ApiRefNode, index: number) => {
            return (
              <dd className="pl-2" key={index}>
                <ApiRefNodeNav node={child} />
              </dd>
            )
          })}
        </dl>
      )}
    </>
  )
}

const ClassRefNodeNav: React.FC<{ node: ApiRefNode }> = ({ node }) => {
  const { currentDocSlug, expandedNodes } = React.useContext(ExpandedNodesContext)
  const isExpanded = expandedNodes.has(node.document.slug)

  return (
    <>
      <div className="flex items-center mb-3">
        <a href={node.document.slug} data-current={currentDocSlug === node.document.slug}>
          {nodeTitle(node)}
        </a>
        {node.properties && (isExpanded ? <ExpandLessIcon className="ml-auto" /> : <ExpandMoreIcon className="ml-auto" />)}
      </div>
      {isExpanded && node.properties && (
        <dl>
          {node.constructorNode && (
            <dt className="pl-2">
              <a href={node.constructorNode?.document.slug}>constructor</a>
            </dt>
          )}
          {Object.values(TypeFieldMap)
            .filter((value) => value !== 'constructor')
            .map((fieldName, index) => {
              return node[fieldName] ? (
                <React.Fragment key={index}>
                  <dt className="pl-2">{fieldName.replace(/./, (c) => c.toUpperCase())}</dt>
                  {node[fieldName as Exclude<RefNodeField, 'constructor'>]!.map((child: ApiRefNode, index: number) => {
                    return (
                      <dd className="pl-2 text-neutral-text" key={index}>
                        <ApiRefNodeNav node={child} />
                      </dd>
                    )
                  })}
                </React.Fragment>
              ) : null
            })}
        </dl>
      )}
    </>
  )
}

export function ApiNav({
  root,
  currentDoc,
  docs,
}: {
  root: ApiRefNode
  currentDoc: MarkdownApiRefDocument
  docs: MarkdownApiRefDocument[]
}) {
  const [expandedNodes, setExpandedNodes] = React.useState(() => {
    const set = new Set<string>()
    const pathPieces = currentDoc.slug.split('.')
    set.add(currentDoc.slug)
    for (let i = pathPieces.length; i > 1; i--) {
      const slug = pathPieces.slice(0, i).join('.')
      const parentSlug = pathPieces.slice(0, i - 1).join('.')
      const doc = docs.find((doc) => doc.slug === slug)
      if (!doc) {
        throw new Error(`Cant find ${slug} ${pathPieces} ${i}`)
      }
      // const parent = docs.find((doc) => doc.slug === parentSlug)!
      const fieldToExpandInParent = TypeFieldMap[doc?.type]
      set.add(`${parentSlug}`)
      set.add(`${parentSlug}.${fieldToExpandInParent}`)
    }
    return set
  })
  const toggle = React.useCallback((path: string) => {
    setExpandedNodes((expanded) => {
      if (expanded.has(path)) {
        expanded.delete(path)
      } else {
        expanded.add(path)
      }
      return new Set(expanded)
    })
  }, [])

  return (
    <ExpandedNodesContext.Provider value={{ toggle, expandedNodes, currentDocSlug: currentDoc.slug }}>
      <nav className="doc-nav api-ref-nav">
        <ApiRefNodeNav node={root} />
      </nav>
    </ExpandedNodesContext.Provider>
  )
}
