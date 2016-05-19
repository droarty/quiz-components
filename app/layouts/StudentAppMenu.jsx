import React from 'react'
import { Link } from 'react-router'
import NavTabs from 'app/components/NavTabs.jsx'

let StudentAppMenu = React.createClass({

  appMenu() {
    return (
      <div className="student-app-menu">
        <div className="menu-container navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="logo">
                <img src={require('app/assets/img/frontier-logo-header.png')}/>
              </Link>
            </div>
          </div>
        </div>
        { this.props.activeProjectId ? <NavTabs {...this.props} /> : '' }
      </div>
    )
  },

  onActivityDetailView() {
    let activityDetailViewRoutes = this.props.routes.filter((route) => {
      return route.component.displayName == 'ActivityDetailView'
    })

    return activityDetailViewRoutes.length > 0
  },

  render() {
    if (this.onActivityDetailView()) {
      return <div></div>
    }

    return this.appMenu()
  }
})

module.exports = StudentAppMenu
