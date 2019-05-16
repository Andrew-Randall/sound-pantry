import React from 'react'
import { Router, browserHistory, Route, IndexRoute} from 'react-router'
import CollectionsContainer from '../containers/CollectionsContainer'
import CollectionShowContainer from '../containers/CollectionShowContainer'
import UserShowContainer from '../containers/UserShowContainer'
import CollectionsFormContainer from '../containers/CollectionsFormContainer'
import DrumsContainer from '../containers/DrumsContainer'


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
          <Route path='/drums' component={DrumsContainer} />
        </Route>
      </Router>
    </div>
  )
}

export default App
