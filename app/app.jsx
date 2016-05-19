import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import routes from 'app/config/routes.jsx'

// Instead of hash history, use pushstate
import { browserHistory as history } from 'react-router'

history.listen(
  (location) => {
    // window.ga('create', window.google_analytics_tracking_id, 'auto')
    // window.ga('send', 'pageview', location.pathname)
  }
)

render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('root')
)
