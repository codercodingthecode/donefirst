import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Button } from './Components/Library/Index';

function App() {
    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="primary">
                        Base Setup
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
