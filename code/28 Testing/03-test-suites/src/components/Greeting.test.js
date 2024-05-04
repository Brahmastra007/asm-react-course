import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// Adding a test suite to add all the tests related to some common functionality
describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });
});
