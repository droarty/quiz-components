jest.dontMock('app/components/SubmitCreation.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'

const SubmitCreation = require('app/components/SubmitCreation.jsx')

describe('SubmitCreation', () => {
  it('loads a project submission upon mounting', () => {
    window.$ = {ajax: jest.genMockFunction()}
    TestUtils.renderIntoDocument(<SubmitCreation project_id="project_id" student_id="student_id"/>)
    expect(window.$.ajax).toBeCalled()
  })

  describe('Submitting draft_url', () => {
    let submitCreation
    beforeEach(() => {
      submitCreation = TestUtils.renderIntoDocument(<SubmitCreation project_id="project_id" student_id="student_id"/>)
    })

    it('tries to create a new project submission if it does not exist and adds the draft_url', () => {
      window.$ = {ajax: jest.genMockFunction()}
      submitCreation.setState({
        attemptSubmission: {
          projects_attempt_id: 'projectAttemptUUID',
          state: 'draft'
        },
        attemptSubmissionFetched: true
      })
      submitCreation.submitDraft()
      expect(window.$.ajax).toBeCalled()
      expect(window.$.ajax.mock.calls[0][0].url).toBe('/projects/attempt_submissions/')
      expect(window.$.ajax.mock.calls[0][0].type).toBe('POST')
    })
  })
})
