jest.dontMock('app/views/ActivityDetailView.jsx')

import TestUtils from 'react-addons-test-utils'
import React from 'react'

const ActivityDetailView = require('app/views/ActivityDetailView.jsx')

describe('ActivityDetailView', () => {
  beforeEach(() => {
    window.$ = {ajax: jest.genMockFunction()}
  })
  it('makes ajax call if activity_id param exists', () => {
    TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123', activity_id: '1'}}/>
    )
    expect(window.$.ajax).toBeCalled()
  })
  it('does not make ajax call if activity_id does not exists', () => {
    TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123'}}/>
    )
    expect(window.$.ajax).not.toBeCalled()
  })
})

describe('successfulFetchActivityAttempt', () => {
  beforeEach(() => {
    window.$ = {ajax: jest.genMockFunction()}
  })
  it('calls createActivityAttempt if no attempts exist', () => {
    let activityDetailView = TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123', activity_id: '1'}}/>
    )
    activityDetailView.createActivityAttempt = jest.genMockFunction()
    activityDetailView.successfulFetchActivityAttempt([])
    expect(activityDetailView.createActivityAttempt).toBeCalled()
  })
  it('simply sets state if one already exists', () => {
    let activityDetailView = TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123', activity_id: '1'}}/>
    )
    activityDetailView.setState = jest.genMockFunction()
    activityDetailView.successfulFetchActivityAttempt([{}])
    expect(activityDetailView.setState).toBeCalled()
  })
})

describe('navWhenDoneWithActivity', () => {
  let activityDetailView
  beforeEach(() => {
    window.$ = {ajax: jest.genMockFunction()}
    activityDetailView = TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123', activity_id: '1'}}/>
    )
  })
  it('creates button that triggers markAttemptComplete when the attempt.finished is false', () => {
    activityDetailView.setState({
      activity_attempt: {
        finished: false
      },
      activity: {
        id: '1',
        url: 'test.com'
      }
    })
    let triggerCompleteButton = TestUtils.findRenderedDOMComponentWithClass(activityDetailView, 'btn-primary')
    expect(triggerCompleteButton).not.toBe(undefined)
  })
  it('creates a simple Link button when the attempt.finished is already true', () => {
    activityDetailView.setState({
      activity_attempt: {
        finished: true
      },
      activity: {
        id: '1',
        url: 'test.com'
      }
    })
    let doneButton = TestUtils.findRenderedDOMComponentWithClass(activityDetailView, 'btn-default')
    expect(doneButton).not.toBe(undefined)
  })
})

describe('markAttemptComplete', () => {
  beforeEach(function() {
    window.$ = {ajax: jest.genMockFunction()}
  })
  it('makes ajax call when button clicked', function() {
    let activityDetailView = TestUtils.renderIntoDocument(
      <ActivityDetailView params={{project_id: '123', activity_id: '1'}}/>
    )
    expect(window.$.ajax.mock.calls.length).toBe(2)
    activityDetailView.setState({
      activity_attempt: {
        finished: false
      },
      activity: {
        id: '1',
        url: 'test.com'
      }
    })
    let markCompleteButton = TestUtils.findRenderedDOMComponentWithClass(activityDetailView, 'btn-primary')
    TestUtils.Simulate.click(markCompleteButton)
    expect(window.$.ajax.mock.calls.length).toBe(3)
  })
})
