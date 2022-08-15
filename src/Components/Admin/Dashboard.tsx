import { Avatar, Container, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { Register } from '../../Models/Register';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { Dialog } from '../Library/Dialog';
import { Button } from '../Library';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailIcon from '@mui/icons-material/MailOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import BadgeIcon from '@mui/icons-material/BadgeOutlined';

const COLOR_GRAY = '#b1b4d0';

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<Register[]>();
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRegister, setSelectedRegister] = useState<Register['id']>('');

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
            {
                field: 'photoDl',
                headerName: 'DL Photo',
                width: 100,
                flex: 1,
                sortable: false,
                renderCell: (params) => {
                    console.log('params', params.row.photoDl);
                    if (params.row.photoDl) {
                        return <img src={params.row.photoDl} alt={params.row.name} style={{ width: '100%' }} />;
                    } else {
                        return null;
                    }
                },
            },
        ],
        []
    );

    const handleActions = useCallback(() => {
        return (
            <Grid item container justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setDialogOpen(false);
                    }}
                >
                    Close
                </Button>
            </Grid>
        );
    }, []);

    const customerRegistrationContent = useMemo(() => {
        const customer = data?.find((c) => c.id === selectedRegister);
        return (
            <Grid container spacing={4}>
                <Grid container item xs={12}>
                    <Grid item>
                        <AccountCircleIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>{customer?.name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6}>
                    <Grid item>
                        <AlignHorizontalLeftIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Data of Birth
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>
                                {customer?.dob
                                    ? DateTime.fromSeconds(customer.dob).toLocaleString(DateTime.DATE_FULL)
                                    : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6}>
                    <Grid item>
                        <PhoneAndroidIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Phone
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>{customer?.phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6}>
                    <Grid item>
                        <MailIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>{customer?.email}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6}>
                    <Grid item>
                        <PendingActionsIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Appointment
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>
                                {customer?.appointment
                                    ? DateTime.fromSeconds(customer.appointment).toLocaleString(DateTime.DATETIME_MED)
                                    : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12}>
                    <Grid item>
                        <HomeIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Address
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>{customer?.address}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12}>
                    <Grid item>
                        <BadgeIcon style={{ fontSize: '50px', color: COLOR_GRAY, marginRight: 8 }} />
                    </Grid>
                    <Grid container item xs direction={'column'}>
                        <Grid item>
                            <Typography variant="body1" color={COLOR_GRAY}>
                                Drive License
                            </Typography>
                        </Grid>
                        <Grid container item>
                            <Avatar
                                alt={customer?.name}
                                src={customer?.photoDl}
                                variant={'square'}
                                sx={{ height: 140, width: 180 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }, [selectedRegister, data]);

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
                        onRowClick={(e) => {
                            setDialogOpen(true);
                            setSelectedRegister(e.row.id);
                        }}
                        disableColumnSelector
                        disableSelectionOnClick
                    />
                </Grid>
            </Grid>
            <Dialog
                open={dialogOpen}
                renderContent={() => customerRegistrationContent}
                onClose={() => setDialogOpen(false)}
                renderActions={handleActions}
            />
        </Container>
    );
};
