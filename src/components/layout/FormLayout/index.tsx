'use client';
import { FunctionComponent, PropsWithChildren } from 'react';
import AppBarComponent from './AppBar';
import { Container } from '@mui/material';

const FormLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <AppBarComponent />
            <Container maxWidth="lg">
                {children}
            </Container>
        </>
    );
}

export default FormLayout;