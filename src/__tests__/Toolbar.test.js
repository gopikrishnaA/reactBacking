import React from 'react'
import renderer from 'react-test-renderer'
import Toolbar from 'connect-nav/lib/Toolbar'

it('renders correctly', () => {
  const tree = renderer.create(<Toolbar />).toJSON()
  expect(tree).toMatchSnapshot()
})
