import React from 'react';
import {Container, Grid, Link, Typography} from '@mui/material';
import {GridColDef } from '@mui/x-data-grid';
import {Router} from "./Components/Core/Router";
import {useNavigate} from "react-router-dom";

function App() {
    console.log('render App');
    const navigate = useNavigate();


    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Typography variant="h1" component={Link}  onClick={() => navigate("/")} sx={{cursor: 'pointer'}}>Done</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Router />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
