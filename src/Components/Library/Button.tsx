import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface ButtonProps extends MuiButtonProps {
    isLoading?: boolean;
}

const Loader = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
    color: 'red',
}));

export const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    return (
        <MuiButton {...props}>
            {children}
            {isLoading && <Loader size={24} />}
        </MuiButton>
    );
};
