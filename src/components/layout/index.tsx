import React from 'react'
import styled from 'styled-components'
import { Navigation } from '../'

const PageContainer = styled.div`
  display: flex;
`

const NavigationContainer = styled.div`
  width: 330px;
  margin: 10px;
`

const Layout = ({ children }) => (
  <PageContainer>
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
    <div>
      { children }
    </div>
  </PageContainer>
)

export {
  Layout
}
