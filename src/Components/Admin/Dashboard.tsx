import { Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { Register } from '../../Models/Register';
import { DataGrid, GridColDef, GridColumns } from '@mui/x-data-grid';
import { DateTime } from 'luxon';

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<Register[]>();
    const [loading, setLoading] = useState(false);

    const getData = useCallback(() => {
        setLoading(true);
        API.get('done-registration-service', '/list', {})
            .then((data) => {
                setData(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        return getData();
    }, [getData]);

    const columns: GridColumns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 100, flex: 1 },
            {
                field: 'dob',
                headerName: 'Data of Birth',
                width: 100,
                flex: 1,
                valueGetter: (params) => {
                    return DateTime.fromSeconds(params.row.dob).toLocaleString(DateTime.DATE_MED);
                },
            },
            { field: 'phone', headerName: 'Phone', width: 100, flex: 1, sortable: false },
            { field: 'email', headerName: 'Email', width: 100, flex: 1 },
            { field: 'address', headerName: 'Address', width: 100, flex: 1, sortable: false },
            {
                field: 'appointment',
                headerName: 'Appointment',
                width: 100,
                flex: 1,
                valueGetter: (params) => {
                    return DateTime.fromSeconds(params.row.appointment).toLocaleString(DateTime.DATETIME_SHORT);
                },
            },
            { field: 'photoDl', headerName: 'DL Photo', width: 100, flex: 1, sortable: false },
        ],
        []
    );

    return (
        <Container disableGutters maxWidth="lg">
            <Grid container justifyContent="center">
                <Grid item>
                    <Typography variant="h3" paddingTop={4} paddingBottom={4}>
                        Admin Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        loading={loading}
                        columns={columns}
                        rows={data || []}
                        disableColumnMenu={true}
                        getRowId={(row) => row.id}
                        disableColumnFilter
                        autoHeight
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
