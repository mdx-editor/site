'use client'
import { ApiRefNode, TypeFieldMap, RefNodeField } from '@/app/apiDocsStructures'
import React from 'react'

function nodeTitle(node: ApiRefNode) {
  if (node.document.type === 'property' || node.document.type === 'method') {
    return node.document.title.split('.').at(-1)
  }
  return node.document.title
}

const ExpandedNodesContext = React.createContext<{ expandedNodes: Set<string>; toggle: (path: string) => void }>({
  expandedNodes: new Set<string>(),
  toggle: () => {
    throw new Error('implement this')
  },
})

const ApiRefNodeNav: React.FC<{ node: ApiRefNode }> = ({ node }) => {
  const { expandedNodes, toggle } = React.useContext(ExpandedNodesContext)

  return (
    <>
      <a href={node.document.slug}>{nodeTitle(node)}</a>
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
              <div key={index}>
                <dt className="pl-2">
                  <button onClick={() => toggle(`${node.document.slug}.${fieldName}`)}>T</button>
                  {fieldName}
                </dt>
                {expandedNodes.has(`${node.document.slug}.${fieldName}`) &&
                  node[fieldName as Exclude<RefNodeField, 'constructor'>]!.map((child: ApiRefNode, index: number) => {
                    return (
                      <dd className="pl-4" key={index}>
                        <ApiRefNodeNav node={child} />
                      </dd>
                    )
                  })}
              </div>
            ) : null
          })}
      </dl>
    </>
  )
}

export function ApiNav({ root }: { root: ApiRefNode }) {
  const [expandedNodes, setExpandedNodes] = React.useState(() => new Set<string>())
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
    <ExpandedNodesContext.Provider value={{ toggle, expandedNodes }}>
      <ApiRefNodeNav node={root} />
    </ExpandedNodesContext.Provider>
  )
}
