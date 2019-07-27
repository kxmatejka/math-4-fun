import React, { FunctionComponent } from 'react'
import Link from 'next/link'

interface NavigationLinkProps {
  href: string,
  as: string
}

const NavigationLink: FunctionComponent<NavigationLinkProps> = ({ href, as, children }) => (
  <Link href={href} as={as}>
    <a>
      { children }
    </a>
  </Link>
)

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavigationLink href='/' as='/'>
          Home
        </NavigationLink>
      </li>
      <li>
        <div>Basics</div>
        <ul>
          <NavigationLink href='/distance-between-points' as='/distance-between-points'>
            Calculate distance between two points
          </NavigationLink>
        </ul>
      </li>
    </ul>
  </nav>
)

export {
  Navigation
}
