jest.dontMock('app/components/ActivityTeaserImage.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Config from 'app/config/config.jsx'

const ActivityTeaserImage = require('app/components/ActivityTeaserImage.jsx')

describe('ActivityTeaserImage', () => {
  it('with defalt props, makes an ajax call for article placeholder', () => {
    window.$ = {ajax: jest.genMockFunction()}
    TestUtils.renderIntoDocument(<ActivityTeaserImage/>)
    expect(window.$.ajax).toBeCalled()
    expect(window.$.ajax.mock.calls[0][0].url).toBe(`/images/${Config.article_placeholder}`)
  })

  it('for video activity type, makes call for video placeholder', () => {
    window.$ = {ajax: jest.genMockFunction()}
    TestUtils.renderIntoDocument(<ActivityTeaserImage activity_type="video"/>)
    expect(window.$.ajax).toBeCalled()
    expect(window.$.ajax.mock.calls[0][0].url).toBe(`/images/${Config.video_placeholder}`)
  })

  it('for image activity type, makes call for video placeholder', () => {
    window.$ = {ajax: jest.genMockFunction()}
    TestUtils.renderIntoDocument(<ActivityTeaserImage activity_type="image"/>)
    expect(window.$.ajax).toBeCalled()
    expect(window.$.ajax.mock.calls[0][0].url).toBe(`/images/${Config.image_placeholder}`)
  })
})
