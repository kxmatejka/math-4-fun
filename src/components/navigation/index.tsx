import React, {FunctionComponent} from 'react'
import Link from 'next/link'

interface NavigationLinkProps {
  href: string,
  as?: string
}

const NavigationLink: FunctionComponent<NavigationLinkProps> = ({href, as = href, children}) => (
  <Link href={href} as={as}>
    <a>
      {children}
    </a>
  </Link>
)

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavigationLink href='/'>
          Home
        </NavigationLink>
      </li>
      <li>
        <div>Basics</div>
        <ul>
          <li>
            <NavigationLink href='/distance-between-points'>
              Calculate distance between two points
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href='/rotate-to-point'>
              Rotate to point
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href='/rotate-around-point'>
              Rotate around point
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href='/move-to-direction'>
              Move to direction
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href='/look-to-direction'>
              Look to direction
            </NavigationLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
)

export {
  Navigation
}
