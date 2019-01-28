import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({ adapter: new Adapter() })

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
*/
const setup = (props = {}, state = null ) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('click increment button increments the counter display', () => {
  const counter = 7
  const wrapper = setup(null, { counter })

  // find increment button and click
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)
})

test('click decrement button decrements the counter display', () => {
  const counter = 8
  const wrapper = setup(null, { counter })

  // find decrement button to click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter - 1)
})

test('counterDisplay remains 0 after decrementing at 0', () => {
  const counter = 0
  const wrapper = setup(null, { counter })

  // find decrement button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(0)
})

test('displays error message when trying to decrement at 0', () => {
  const counter = 0
  const wrapper = setup(null, { counter })

  // find decrement button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')

  // find error display and test
  const errorDisplay = findByTestAttr(wrapper, 'error-display')
  expect(errorDisplay.text()).toBe('The counter cannot go below 0')
})

test('removes error message when incrementing from 0', () => {
  const counter = 0
  const wrapper = setup(null, { counter })

  // find increment button and click
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')

  // find error display and test
  const errorDisplay = findByTestAttr(wrapper, 'error-display')
  expect(errorDisplay.text()).toBe('');
})