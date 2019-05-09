import React from 'react'
import { Router, browserHistory, Route, IndexRoute} from 'react-router'
import PacksContainer from './PacksContainer'
import PackShowContainer from './PackShowContainer'
import UserShowContainer from './UserShowContainer'
import PacksFormContainer from './PacksFormContainer'


export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={PacksContainer}/>
        <Route path='/packs' component={PacksContainer} />
        <Route path='/packs/new' component={PacksFormContainer} />
        <Route path='/packs/:id' component={PackShowContainer} />
        <Route path='/users/:id' component={UserShowContainer} />
      </Route>
      </Router>
    </div>
  )
}

export default App
