import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  title: string
  children: ReactNode
  isRootPath?: boolean
}

const Layout = ({ title, children, isRootPath = false }: LayoutProps) => {
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link href="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" href="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://nextjs.org">Next.js</a>
      </footer>
    </div>
  )
}

export default Layout