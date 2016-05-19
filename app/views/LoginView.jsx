import React from 'react'
import Auth from 'app/config/auth.jsx'

let LoginView = React.createClass({
  propTypes: {
    signedIn: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      email: null,
      nonStudentLogin: false,
      signedIn: false
    }
  },

  getInitialState: function() {
    return {
      errors: null
    }
  },

  handleLogoutClick: function() {
    Auth.signOut()
      .then(()=> {
        window.location.href = '/'
      })
  },

  handleAuthClick() {
    Auth.oAuthSignIn({
      provider: 'google'
    }).then(()=> {
      this.setState({
        errors: null
      })
    }).fail((response)=> {
      this.setState({
        errors: response.data.errors
      })
    })
  },

  renderLogoArea() {
    return (
      <div className="logo-area">
        <img className="frontier-logo" src={ require('app/assets/img/frontier-logo-stacked.png') }/>
        <p>
          What do you <span className="login-em">love</span>?
          What do you <span className="login-em">wonder</span>?
          What will you <span className="login-em">learn</span>?
          What will you <span className="login-em">make</span>?
        </p>
      </div>
    )
  },

  renderLoginButton() {
    if (this.props.nonStudentLogin) {
      return (
        <div className="unrecognized-login">
          <p><span
            className="error-message">Sorry, eSpark Frontier doesn't recognize this Google account: </span> &nbsp; {this.props.email}
          </p>
          <p>Please logout and try again with the Google account your school provided.</p>
          <div className="text-center">
            <button className="btn btn-primary btn-lg"
                    onClick={this.handleLogoutClick}>
              Log Out
            </button>
          </div>
          <p style={{paddingTop: 20}}>If you are still having trouble ask your teacher or administrator for help.</p>
        </div>
      )
    }
    else {
      return (
        <div className="text-center">
          <button className="btn btn-primary btn-lg text-center"
                  onClick={this.handleAuthClick}
                  disabled={this.props.signedIn}>
            Log In With Google
          </button>
        </div>
      )
    }
  },

  render() {
    return (
      <div className="login-view">
        <img className="espark-logo" src={ require('app/assets/img/espark-logo-header.png') }/>
        <div className="container">
          { this.renderLogoArea() }
          { this.renderLoginButton() }
        </div>
      </div>
    )
  }
})

module.exports = LoginView
