import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Registration } from './Components/Customer/Index';

function App() {
    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Typography variant="h1">Done</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Registration />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
