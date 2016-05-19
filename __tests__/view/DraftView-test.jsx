// __tests__/components/ActivityTeaser-test.js
jest.dontMock('app/views/DraftView.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'

const DraftView = require('app/views/DraftView.jsx')

describe('DraftView', () => {
  beforeEach(() => {
    window.$ = {ajax: jest.genMockFunction()}
  })

  it('Marks allActivitiesAreComplete if all activities are complete', () => {
    let draftView = TestUtils.renderIntoDocument(
      <DraftView params={{project_id: '1'}}/>
    )
    let activities = [
      {activities_attempts: [{stopped_at: 'datestring'}]},
      {activities_attempts: [{stopped_at: 'datestring'}]},
      {activities_attempts: [{stopped_at: 'datestring'}]}
    ]
    expect(draftView.areActivitiesComplete(activities)).toBe(true)
  })

  it('Marks allActivitiesAreComplete as false if any activity is incomplete', () => {
    let draftView = TestUtils.renderIntoDocument(
      <DraftView params={{project_id: '1'}}/>
    )
    let activities = [
      {activities_attempts: [{stopped_at: 'datestring'}]},
      {activities_attempts: [{stopped_at: 'datestring'}]},
      {}
    ]
    expect(draftView.areActivitiesComplete(activities)).toBe(false)
  })

})
