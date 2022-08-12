import {Container, Grid, Typography} from "@mui/material";


export const Dashboard: React.FC = () => {

    return (
        <Container disableGutters maxWidth="xl">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Admin Dashboard
                    </Typography>
                </Grid>

            </Grid>
        </Container>
    )
}