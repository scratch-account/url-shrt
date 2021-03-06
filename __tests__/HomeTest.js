/**
 * @jest-environment jsdom
 */

// FIXME: Error occurs when running this file as typescript (.ts)

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
    // Verify form input is present
    expect(
      screen.getByLabelText('Enter your URL', { selector: 'input' })
    ).toBeInTheDocument()
  })
})
