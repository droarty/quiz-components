import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import _ from 'lodash'
import ReactDOM from 'react-dom'

let $R = require('rquery')(_, React, ReactDOM, TestUtils)

// rquery only accepts rendered reactComponents like the following:
//     $R(TestUtils.renderIntoDocument(<MyComponent/>))
// So this method wraps the rquery method allowing us to pass in
// any kind of react element so all of the following will work:
//     $R(TestUtils.renderIntoDocument(<MyComponent/>))
//     $R([<MyListItem/><MyListItem/>])
//     $R(<div><MyComponent/></div>)
//     $R(<MyComponent/>)

let rquery_wrapper = function(reactObject) {
  if (!_.isObject(reactObject)) {
    throw 'rquery ($R) expects a React element or constructor.'
  }
  if (reactObject.hasOwnProperty('_reactInternalInstance')) {
    return $R(reactObject)
  }
  else {
    let renderedElement
    if (_.isArray(reactObject) || typeof reactObject.type == 'string') {
      let TemporaryComponent = React.createClass({
        render() {
          return (<div>{reactObject}</div>)
        }
      })
      renderedElement = TestUtils.renderIntoDocument(<TemporaryComponent/>)
    }
    else {
      renderedElement = TestUtils.renderIntoDocument(reactObject)
    }
    return $R(renderedElement)
  }
}

module.exports = rquery_wrapper
