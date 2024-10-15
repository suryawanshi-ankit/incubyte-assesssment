import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StringCalculator = () => {
    const [inputString, setInputString] = useState('');
    const [finalSum, setFinalSum] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const calculateSum = () => {
        let delimiter = ',';
        if (inputString.startsWith('//')) {
            delimiter = inputString.substring(2, 3);
        }
        const inputStringToArr = inputString.split(delimiter);

        try {
            const numbers = inputStringToArr
                .map(item => item.trim()) // Remove any extra whitespace/newlines
                .flatMap(item => item.split('\n')) // Split by newline and flatten the result
                .filter(item => !isNaN(item)) // Keep only numeric values
                .map(Number); // Convert to numbers

            // Find negative numbers
            const negativeNumbers = numbers.filter(num => num < 0);

            // If negative numbers exist, throw an error
            if (negativeNumbers.length > 0) {
                throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
            }

            // Sum the numbers
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            setFinalSum(sum);
            setErrorMessage(null);
        }
        catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
            setFinalSum(null);
        }
    }

    return (
        <CalculatorWrapper>
            <TextField
                id="outlined-basic"
                label="enter string to sum"
                variant="outlined"
                multiline
                onChange={(e) => setInputString(e.target.value)}
            />
            <Button variant="outlined" onClick={calculateSum}>Click to find sum of string</Button>
            {finalSum ? <h2>Result: {finalSum}</h2> : null}
            {errorMessage ? <h2>Error: {errorMessage}</h2> : null}
        </CalculatorWrapper>
    )
}

const CalculatorWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    gap: 5,
});

export default StringCalculator;
