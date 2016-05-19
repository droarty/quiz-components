// TODO fix $.ajaxSetup in auth.jsx not getting mocked

// jest.dontMock('app/layouts/StudentApp')

// import TestUtils from 'react-addons-test-utils'
// import React from 'react'
// import Auth from 'app/config/auth.js'

// const StudentApp  = require('app/layouts/StudentApp')
// const LoginView  = require('app/views/LoginView')


// describe('StudentApp', () => {
//   beforeEach(() => {
//     window.$ = {ajaxSetup: jest.genMockFunction()}
//   })

//   it('shows login component if not authenticated', () => {
//     // components that expect children must be passed children in the test.
//     let studentApp = TestUtils.renderIntoDocument(<StudentApp><span></span></StudentApp>)
//     let loginViewList = TestUtils.scryRenderedComponentsWithType(studentApp, LoginView)
//     expect(loginViewList.length).toBe(1)
//   })
//   it('shows router content if authenticated', () => {
//     let studentApp = TestUtils.renderIntoDocument(<StudentApp><span></span></StudentApp>)
//     studentApp.setState({user:{signedIn: true, student_id: '1'}})
//     let loginViewList = TestUtils.scryRenderedComponentsWithType(studentApp, LoginView)
//     expect(loginViewList.length).toBe(0)
//     let spanChildren = TestUtils.scryRenderedDOMComponentsWithTag(studentApp, 'span')
//     expect(spanChildren.length).toBe(1)
//   })
// })
