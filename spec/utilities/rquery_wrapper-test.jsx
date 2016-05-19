import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import $R from 'spec/utilities/rquery_wrapper.jsx'
let MyComponent = React.createClass({
  render() {
    return (<div><span className='my-class'></span></div>)
  }
})

describe('rquery-wrapper', function() {
  it('accepts a rendered reactComponent', function() {
    let myComponent = TestUtils.renderIntoDocument(<MyComponent/>)
    expect($R(myComponent).find('.my-class')).to.have.length(1)
  })

  it('accepts an unrendered reactComponent', function() {
    expect($R(<MyComponent/>).find('.my-class')).to.have.length(1)
  })

  it('accepts an unrendered reactComponent nested in a dom node', function() {
    expect($R(<div><MyComponent/></div>).find('.my-class')).to.have.length(1)
  })

  it('accepts an unrendered list of reactComponents', function() {
    let componentList = []
    componentList.push(<MyComponent key='1'/>)
    componentList.push(<MyComponent key='2'/>)
    expect($R(componentList).find('.my-class')).to.have.length(2)
  })
})
