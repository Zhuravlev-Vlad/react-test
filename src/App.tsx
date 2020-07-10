import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import './style/App.sass'
import Main from './pages/Main/Main'
import Issues from './pages/Issues/Issues'
import Issue from './pages/Issue/Issue'
import Loader from './components/Loader/Loader'
import Error404 from './components/Error/404'
import Notification from './components/Notification/Notification'

import { connect } from 'react-redux'
import { State } from './constants/types'

interface Props {
  error_status: number | null
}
const App: React.FC<Props> = (props) => {
  const { error_status } = props
  if (error_status === 404) {
    return (
      <Error404/>
    )
  }
  return (
    <BrowserRouter>
      <Loader/>
      <Notification error_code={error_status}/>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route exact path="/issues/:owner/:repo" render={(props) => <Issues {...props} /> }/>
          <Route path="/issues/:owner/:repo/:issue_number" render={(props) => <Issue {...props} /> }/>
          <Route path="*">
            <Error404/>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}
const putStateToProps = (state: State) => {
  const { error_status } = state.searchReducer
  return {
    error_status
  }
}

export default connect(putStateToProps)(App)
