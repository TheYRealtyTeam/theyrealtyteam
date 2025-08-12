declare module 'react-original' {
  export * from 'react'
  const ReactDefault: typeof import('react')
  export default ReactDefault
}
