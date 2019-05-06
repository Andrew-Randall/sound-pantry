import React from 'react';
import { Router, browserHistory, Route} from 'react-router';
import PacksContainer from './PacksContainer'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={PacksContainer}/>
        <Route path='/packs' component={PacksContainer} />
      </Router>
    </div>
  )
}

export default App
