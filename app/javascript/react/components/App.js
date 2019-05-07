import React from 'react'
import { Router, browserHistory, Route} from 'react-router'
import PacksContainer from './PacksContainer'
import PackShowContainer from './PackShowContainer'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={PacksContainer}/>
        <Route path='/packs' component={PacksContainer} />
        <Route path='/packs/:id' component={PackShowContainer} />
      </Router>
    </div>
  )
}

export default App
