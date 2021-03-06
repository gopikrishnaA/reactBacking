import React from 'react'
import renderer from 'react-test-renderer'
import SideNav from 'connect-nav/lib/SideNav'
import data from '../static/data'
it('renders correctly with all props', () => {
  const tree = renderer
    .create(
      <SideNav appLogo={data.appLogo} appName={data.appName} sideNavLinks={data.sideNavLinks} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with no props', () => {
  const tree = renderer.create(<SideNav />).toJSON()
  expect(tree).toMatchSnapshot()
})
