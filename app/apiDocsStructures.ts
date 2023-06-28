export interface ApiRefNode {
  document: MarkdownApiRefDocument
  constructorNode?: ApiRefNode
  functions?: ApiRefNode[]
  types?: ApiRefNode[]
  properties?: ApiRefNode[]
  methods?: ApiRefNode[]
  classes?: ApiRefNode[]
  interfaces?: ApiRefNode[]
  variables?: ApiRefNode[]
  packages?: ApiRefNode[]
}

export const TypeFieldMap = {
  class: 'classes',
  constructor: 'constructor',
  function: 'functions',
  type: 'types',
  property: 'properties',
  method: 'methods',
  interface: 'interfaces',
  variable: 'variables',
  package: 'packages',
} as const

export type DocumentType = keyof typeof TypeFieldMap
export type RefNodeField = (typeof TypeFieldMap)[DocumentType]

export interface MarkdownApiRefDocument {
  slug: string
  content: string
  title: string
  type: keyof typeof TypeFieldMap
  slugParts: string[]
}
