import React from 'react'
import { Router, browserHistory, Route, IndexRoute} from 'react-router'
import CollectionsContainer from './CollectionsContainer'
import CollectionShowContainer from './CollectionShowContainer'
import UserShowContainer from './UserShowContainer'
import CollectionsFormContainer from './CollectionsFormContainer'


export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={CollectionsContainer}/>
        <Route path='/collections' component={CollectionsContainer} />
        <Route path='/collections/new' component={CollectionsFormContainer} />
        <Route path='/collections/:id' component={CollectionShowContainer} />
        <Route path='/users/:id' component={UserShowContainer} />
      </Route>
      </Router>
    </div>
  )
}

export default App
