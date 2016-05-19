// __tests__/components/ActivityTeaser-test.js
jest.dontMock('app/components/ActivityTeaser.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Link } from 'react-router'

const ActivityTeaser = require('app/components/ActivityTeaser.jsx')

describe('ActivityTeaser', () => {

  it('Displays title', () => {
    let activity = {title: 'Test', instructions: 'Instructions'}
    let activityTeaser = TestUtils.renderIntoDocument(
      <ActivityTeaser activity={activity}/>
    )

    let activityTeaserNode = ReactDOM.findDOMNode(activityTeaser)

    expect(activityTeaserNode.textContent).toContain('Test')

  })

  it('Displays a link to an activity', () => {
    let activityTeaser = TestUtils.renderIntoDocument(
      <ActivityTeaser project_id="pid" activity={{id: 'aid'}}/>
    )

    let activityTeaserLink = TestUtils.findRenderedComponentWithType(activityTeaser, Link)

    expect(activityTeaserLink.props.to).toBe('/projects/pid/activities/aid')

  })
})
