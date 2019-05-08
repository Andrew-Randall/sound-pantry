import React from 'react'
import { Router, browserHistory, Route} from 'react-router'
import PacksContainer from './PacksContainer'
import PackShowContainer from './PackShowContainer'
import UserShowContainer from './UserShowContainer'
import PacksFormContainer from './PacksFormContainer'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={PacksContainer}/>
        <Route path='/packs' component={PacksContainer} />
        <Route path='/packs/new' component={PacksFormContainer} />
        <Route path='/packs/:id' component={PackShowContainer} />
        <Route path='/users/:id' component={UserShowContainer} />
      </Router>
    </div>
  )
}

export default App
