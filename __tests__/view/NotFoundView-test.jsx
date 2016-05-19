jest.dontMock('app/views/NotFoundView.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'

import NotFoundView  from 'app/views/NotFoundView.jsx'

describe('NotFoundView', () => {
  it('create node', () => {

    let notFoundView = TestUtils.renderIntoDocument(<NotFoundView />)

    expect(notFoundView).not.toBeNull()
    expect(TestUtils.isCompositeComponentWithType(notFoundView, NotFoundView))
  })
})
