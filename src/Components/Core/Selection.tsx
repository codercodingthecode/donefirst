import {Container, Grid } from "@mui/material";
import {Button} from "../Library";
import {useNavigate} from "react-router-dom";


export const PageSelection: React.FC = () =>  {
    const navigate = useNavigate();

    return (
        <Container disableGutters maxWidth="xl">
            <Grid container justifyContent="center" alignItems='center' paddingTop={6}>
                <Grid container item xs={6} justifyContent='center'>
                    <Button variant="outlined" onClick={() => navigate('/customer')}>Customer</Button>
                </Grid>
                    <Grid container item xs={6} justifyContent='center'>
                    <Button variant="outlined" onClick={() => navigate('/admin')}>Administrator</Button>
                </Grid>
            </Grid>
        </Container>
    )
}