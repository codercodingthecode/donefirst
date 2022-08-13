import {Container, Grid, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {API} from "aws-amplify";
import {Register} from "../../Models/Register";


export const Dashboard: React.FC = () => {
    const [data, setData] = useState<Register[]>();
    const [loading, setLoading] = useState(false);

    const getData = useCallback(  () => {
        setLoading(true);
        API.get("done-registration-service", "/list", {}).then(data => {
            setData(data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        return getData();
    } , [getData])

    console.log('render Dashboard');
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