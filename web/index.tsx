import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import { process } from './i18n'
import App from './App'
import * as models from './models'

ReactDOM.render(<div>hello</div>, document.getElementById('app'))

const store = init({ models })

class Loading extends React.PureComponent {
  public state = { loading: true }
  public render () {
    return this.state.loading
      ? <div>Loading...</div>
      : <Provider store={store}><App /></Provider>
  }
}

const h = ReactDOM.render(<Loading />, document.getElementById('app'))
process.then(() => (h as any).setState({ loading: false }))
