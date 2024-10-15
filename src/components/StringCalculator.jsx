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
        <>
            <CalculatorWrapper>
                <div>
                    <StyledTextField
                        id="outlined-basic"
                        label="Enter string to sum"
                        variant="outlined"
                        multiline
                        onChange={(e) => setInputString(e.target.value)}
                    />
                </div>
                <Button variant="outlined" onClick={calculateSum}>
                    Click to find sum of string
                </Button>
                {finalSum ? <StyledResultHeading>Result: {finalSum}</StyledResultHeading> : null}
                {errorMessage ? <StyledErrorHeading>Error: {errorMessage}</StyledErrorHeading> : null}
            </CalculatorWrapper>
        </>
    )
}

const CalculatorWrapper = styled('div')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: '100vh', // Full page height
    textAlign: 'center'
});

const StyledTextField = styled(TextField)({
    marginBottom: '1rem',
    width: '20rem'
});

const StyledResultHeading = styled('h1')({
    color: 'green',
});

const StyledErrorHeading = styled('h1')({
    color: 'red',
});

export default StringCalculator;
