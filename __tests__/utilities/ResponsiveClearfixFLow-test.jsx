jest.dontMock('app/utilities/ResponsiveClearfixFlow.jsx')

import React from 'react'

const ResponsiveClearfixFlow = require('app/utilities/ResponsiveClearfixFlow.jsx')

describe('ResponsiveClearfixFlow', () => {
  let listOfDivs, modifiedListOfDivs
  beforeEach(() => {
    listOfDivs = [
      <div id="1"></div>,
      <div id="2"></div>,
      <div id="3"></div>,
      <div id="4"></div>,
      <div id="5"></div>,
      <div id="6"></div>
    ]
    modifiedListOfDivs = ResponsiveClearfixFlow(listOfDivs)
  })

  it('adds four more divs to the list', () => {
    expect(modifiedListOfDivs.length).toBe(10)
  })

  it('divs at index = 2, 4, 6, and 9 all have the clearfix class', () => {
    expect(modifiedListOfDivs[2].props.className).toEqual('visible-sm-block clearfix')
    expect(modifiedListOfDivs[4].props.className).toEqual('visible-md-block visible-lg-block clearfix')
    expect(modifiedListOfDivs[6].props.className).toEqual('visible-sm-block clearfix')
    expect(modifiedListOfDivs[9].props.className).toEqual('visible-md-block visible-lg-block visible-sm-block clearfix')
  })
})
