jest.dontMock('app/views/ProjectDetailView.jsx')

import TestUtils from 'react-addons-test-utils'
import React from 'react'
import ReactDOM from 'react-dom'

const ProjectDetailView = require('app/views/ProjectDetailView.jsx')

describe('ProjectDetailView', () => {
  describe('render', () => {
    beforeEach(() => {
      window.$ = {ajax: jest.genMockFunction()}
    })

    it('without a project_attempt it displays Loading...', () => {
      let projectDetailView = TestUtils.renderIntoDocument(
        <ProjectDetailView params={{project_id: '123'}}
                           activeProjectAttemptsFetched={true}/>
      )
      let projectDetailViewNode = ReactDOM.findDOMNode(projectDetailView)

      expect(projectDetailViewNode.textContent).toContain('Loading')
    })

    it('with no activeProjectId it displays "Start this Project"', () => {
      let projectDetailView = TestUtils.renderIntoDocument(
        <ProjectDetailView params={{project_id: '123'}}
                           activeProjectAttemptsFetched={true}/>
      )
      let button = projectDetailView.projectSelectionButtons().props.children[1]
      expect(button.props.children).toEqual('Start This Project')
    })

    it('with an activeProjectId it displays "Continue this Project"', () => {
      let projectDetailView = TestUtils.renderIntoDocument(
        <ProjectDetailView params={{project_id: '123'}}
                           activeProjectAttemptsFetched={true}
                           activeProjectId='567'/>
      )
      let button = projectDetailView.projectSelectionButtons().props.children
      expect(button.props.children).toEqual('Continue This Project')
    })
  })
})
