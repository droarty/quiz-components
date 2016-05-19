import React from 'react'
import PubSub from 'pubsub-js'
import Config from 'app/config/config.jsx'
import LoginView from 'app/views/LoginView.jsx'

require('app/config/ajaxSetup.jsx')
require('app/assets/css/student_app.scss')

import StudentAppMenu from 'app/layouts/StudentAppMenu.jsx'

let StudentApp = React.createClass({
  getInitialState: function() {
    return {
      user: {}
    }
  },

  componentWillMount: function() {
  },

  constructContent() {
    let childProps = {
      user: this.state.user,
    }

    /*  pass state as props to children */
    let allChildren = React.cloneElement(
      this.props.children,
      ...[childProps]
    )

    return allChildren
  },

  renderMenu() {
    let menu =
      <StudentAppMenu
        {...this.state.user}
        {...this.props}
      />
    return menu
  },

  renderContent() {
    return (
      <div className="content-area">
        { this.constructContent() }
      </div>
    )
  },

  renderFooter() {
    return (
      <div className="footer">
      </div>
    )
  },

  render() {
    return (
      <div>
        { this.renderMenu() }
        { this.renderContent() }
        { this.renderFooter() }
      </div>
    )
  }
})

module.exports = StudentApp
