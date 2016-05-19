jest.dontMock('app/components/PeerReviewForm.jsx')
jest.dontMock('app/components/RubricDimension.jsx')
jest.dontMock('react-checkbox-group')


import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {then} from '__tests__/lib/test-utilities.js'
import RubricDimension from 'app/components/RubricDimension.jsx'
import CheckboxGroup from 'react-checkbox-group'

const PeerReviewForm = require('app/components/PeerReviewForm.jsx')
const rubric_dimensions = [
  {id: '123', title: '123', self_prompt: '', improvement_prompt: '', positive_prompt: ''},
  {id: '456', title: '456', self_prompt: '', improvement_prompt: '', positive_prompt: ''},
  {id: '789', title: '789', self_prompt: '', improvement_prompt: '', positive_prompt: ''}
]

describe('PeerReviewForm', () => {
  it('lists rubric_dimensions', () => {
    let peerReviewForm = TestUtils.renderIntoDocument(<PeerReviewForm rubric_dimensions={ rubric_dimensions }
                                                                      peer_response_id={'asdf'}
                                                                      student_id={'123'}/>)
    let peerReviewFormNode = ReactDOM.findDOMNode(peerReviewForm)
    let inputNodes = TestUtils.scryRenderedDOMComponentsWithTag(peerReviewForm, 'input')
    let letsMakeTheLinterHappy = [RubricDimension, CheckboxGroup]
    expect(letsMakeTheLinterHappy).toEqual([RubricDimension, CheckboxGroup])
    expect(peerReviewFormNode.textContent).toContain('456')
    expect(inputNodes.length).toBe(3)
  })

  it('selected_dimensions gets populated upon clicks', (done) => {
    let peerReviewForm = TestUtils.renderIntoDocument(<PeerReviewForm rubric_dimensions={ rubric_dimensions }
                                                                      peer_response_id={'asdf'}
                                                                      student_id={'123'}/>)
    let inputNodes = TestUtils.scryRenderedDOMComponentsWithTag(peerReviewForm, 'input')
    TestUtils.Simulate.click(inputNodes[0])
    then(() => {
      expect(peerReviewForm.state.selected_dimensions).toBe([inputNodes[0].value])
      inputNodes = TestUtils.scryRenderedDOMComponentsWithTag(peerReviewForm, 'input')
      TestUtils.Simulate.click(inputNodes[1])
      then(() => {
        expect(peerReviewForm.state.selected_dimensions).toMatchArray([inputNodes[0].value, inputNodes[1]])
        done()
      })
    })
  })

  it('submits a peer review and removes the button when it has text and dimensions', () => {
    let peerReviewForm = TestUtils.renderIntoDocument(<PeerReviewForm rubric_dimensions={ rubric_dimensions }
                                                                      peer_response_id={'asdf'}
                                                                      student_id={'123'}/>)
    let submitButton = TestUtils.findRenderedDOMComponentWithTag(peerReviewForm, 'button')
    window.$ = {ajax: jest.genMockFunction()}
    peerReviewForm.setState({
      selected_dimensions: ['abc'],
      text_response: 'test'
    })
    TestUtils.Simulate.click(submitButton)
    then(() => {
      expect(window.$.ajax).toBeCalled()
      let anySubmitButtons = TestUtils.scryRenderedDOMComponentsWithTag(peerReviewForm, 'button')
      expect(anySubmitButtons.length).toBe(0)
    })
  })

  it('does not submit a peer review or remove the button when it is missing text or dimensions', () => {
    let peerReviewForm = TestUtils.renderIntoDocument(<PeerReviewForm rubric_dimensions={ rubric_dimensions }
                                                                      peer_response_id={'asdf'}
                                                                      student_id={'123'}/>)
    let submitButton = TestUtils.findRenderedDOMComponentWithTag(peerReviewForm, 'button')
    window.$ = {ajax: jest.genMockFunction()}
    TestUtils.Simulate.click(submitButton)
    then(() => {
      expect(window.$.ajax).not.toBeCalled()
      let anySubmitButtons = TestUtils.scryRenderedDOMComponentsWithTag(peerReviewForm, 'button')
      expect(anySubmitButtons.length).toBe(1)
    })
  })
})
