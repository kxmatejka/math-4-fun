import App, {Container} from 'next/app'
import {Layout} from '../src/components/layout'

export default class extends App {
  render() {
    const {
      Component,
      pageProps
    } = this.props

    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
