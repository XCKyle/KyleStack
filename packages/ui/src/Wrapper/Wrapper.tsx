import React from 'react'

export default function Wrapper({ children, className}: { children: React.ReactNode, className?: string | undefined}) {
  return (
    <div className={`w-full max-w-7xl px-5 md:px-10 mx-auto ${className || ''}`}>
      {children}
    </div>
  )
}
