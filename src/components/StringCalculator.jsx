import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

const StringCalculator = () => {
    const [inputString, setInputString] = useState('');

    return (
        <CalculatorWrapper>
            <TextField
                id="outlined-basic"
                label="enter string to sum"
                variant="outlined"
                multiline
                onChange={(e) => setInputString(e.target.value)}
            />
            <Button variant="outlined">Click to find sum of string</Button>
        </CalculatorWrapper>
    )
}

const CalculatorWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    gap: 5,
});

export default StringCalculator;
