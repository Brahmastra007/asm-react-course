import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders Hello World as a text', () => {
  // Arrange
  // Rendering the 'Greeting' component
  render(<Greeting />);

  // Act
  // ... nothing

  // Assert
  // Getting the element by text
  const helloWorldElement = screen.getByText('Hello World!');
  // Asserting that the element exists in the document
  expect(helloWorldElement).toBeInTheDocument();
});