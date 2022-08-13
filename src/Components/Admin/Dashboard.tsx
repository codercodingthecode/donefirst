import {Container, Grid, Typography} from "@mui/material";
import {useEffect} from "react";
import {API} from "aws-amplify";


export const Dashboard: React.FC = () => {

    useEffect(() => {
        API.get("done-registration-service", "/list", {}).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    } , [])

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