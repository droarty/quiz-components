// __tests__/components/ActivityTeaser-test.js
jest.dontMock('app/components/ActivityDisplayAsVideo.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'

const ActivityDisplayAsVideo = require('app/components/ActivityDisplayAsVideo.jsx')

describe('ActivityDisplayAsVideo', () => {

  it('determines the videoId from a youtube url', () => {
    let activityDisplayAsVideo = TestUtils.renderIntoDocument(
      <ActivityDisplayAsVideo src='test.com?v=123&foo=bar'/>
    )

    expect(activityDisplayAsVideo.getVideoId()).toBe('123')
  })
})
