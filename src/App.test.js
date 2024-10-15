import { fireEvent, render, screen } from '@testing-library/react';
import Header from './components/Header';
import StringCalculator from './components/StringCalculator';

// HEADER TEST CASES

// Render Test
test('renders Header component without crashing', () => {
    render(<Header />);
    expect(screen.getByText('Incubyte TDD Assessment - Frontend')).toBeInTheDocument();
});
//Check Heading Text
test('renders correct heading text', () => {
    render(<Header />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Incubyte TDD Assessment - Frontend');
});

// STRINGCALCULATOR TEST CASES

//Render Test
test('renders StringCalculator component without crashing', () => {
    render(<StringCalculator />);
    expect(screen.getByLabelText('enter string to sum')).toBeInTheDocument();
    expect(screen.getByText('Click to find sum of string')).toBeInTheDocument();
});
// TextField Input Handling
test('updates inputString state on user input', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    fireEvent.change(inputField, { target: { value: '1,2,3' } });
    expect(inputField.value).toBe('1,2,3');
});
// Button Existence
test('renders button with correct text', () => {
    render(<StringCalculator />);
    const buttonElement = screen.getByRole('button', { name: 'Click to find sum of string' });
    expect(buttonElement).toBeInTheDocument();
});
// Correct Sum Calculation
test('calculates sum of numbers correctly', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    const button = screen.getByText('Click to find sum of string');

    fireEvent.change(inputField, { target: { value: '1,2,3' } });
    fireEvent.click(button);

    expect(screen.getByText('Result: 6')).toBeInTheDocument();
});
// Handle Newline as Delimiter
test('handles newline as delimiter and calculates sum', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    const button = screen.getByText('Click to find sum of string');

    fireEvent.change(inputField, { target: { value: '1\n2,3' } });
    fireEvent.click(button);

    expect(screen.getByText('Result: 6')).toBeInTheDocument();
});
// Custom Delimiter Handling
test('handles custom delimiter and calculates sum', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    const button = screen.getByText('Click to find sum of string');

    fireEvent.change(inputField, { target: { value: '//;\n1;2;3' } });
    fireEvent.click(button);

    expect(screen.getByText('Result: 6')).toBeInTheDocument();
});
// Negative Number Error Handling
test('throws error for negative numbers', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    const button = screen.getByText('Click to find sum of string');

    fireEvent.change(inputField, { target: { value: '1,-2,3' } });
    fireEvent.click(button);

    expect(screen.getByText('Error: Negative numbers not allowed: -2')).toBeInTheDocument();
});
// Empty Input Edge Case
test('handles empty input gracefully', () => {
    render(<StringCalculator />);
    const inputField = screen.getByLabelText('enter string to sum');
    const button = screen.getByText('Click to find sum of string');

    fireEvent.change(inputField, { target: { value: '' } });
    fireEvent.click(button);

    expect(screen.queryByText('Result:')).toBeNull();
    expect(screen.queryByText('Error:')).toBeNull();
});


