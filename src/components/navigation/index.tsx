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
        <NavigationLink href={'/'} as={'/'}>
          Home
        </NavigationLink>
      </li>
      <li>
        <div>Basics</div>
        <ul>
          <li>
            <NavigationLink href={'/distance-between-points'} as={'/distance-between-points'}>
              Calculate distance between two points
            </NavigationLink>
          </li>
          <li>
            Rotate to point
          </li>
          <li>
            Move to direction
          </li>
          <li>
            Detect collision
          </li>
        </ul>
      </li>
    </ul>
  </nav>
)

export {
  Navigation
}
