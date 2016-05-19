import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import StudentApp from 'app/layouts/StudentApp.jsx'
import ErrorView from 'app/views/ErrorView.jsx'
import NotFoundView from 'app/views/NotFoundView.jsx'
import QuestionView from 'app/views/QuestionView.jsx'

module.exports = (
  <Route path="/" component={StudentApp}>
    <IndexRoute component={QuestionView}/>
    <Route path="error/:error_status" component={ErrorView}/>
    <Route path="*" component={NotFoundView}/>
  </Route>
)
