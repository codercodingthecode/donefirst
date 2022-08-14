import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Button } from '../Library';
import * as Yup from 'yup';
import { phoneValidation } from '../../Utils/String';
import { API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { Register } from '../../Models/Register';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DoneIcon from '@mui/icons-material/Done';

const formValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    dob: Yup.number().required('Date of Birth is required'),
    phone: Yup.string()
        .test('phone-test', 'Enter a valid phone number', (value) => phoneValidation.test(value || ''))
        .required('Phone is required'),
    email: Yup.string().email('Enter a valid Email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    photoDl: Yup.string().required('Photo DL is required'),
    appointment: Yup.number().required('Appointment Date is required'),
});

export const Registration: FC = () => {
    const [fileIsUploading, setFileIsUploading] = useState(false);
    const [filedUploaded, setFileUploaded] = useState(false);

    const formik = useFormik<Register>({
        initialValues: {
            id: uuid(),
            dob: undefined,
            name: '',
            phone: '',
            email: '',
            photoDl: '',
            address: '',
            appointment: undefined,
        },
        validationSchema: formValidationSchema,

        onSubmit: (values, { setSubmitting, resetForm }) => {
            API.post('done-registration-service', '', {
                body: values,
            })
                .then(() => {
                    setSubmitting(false);
                    resetForm();
                })
                .catch((err) => {
                    setSubmitting(false);
                    setFileUploaded(false);
                })
                .finally(() => {
                    setFileUploaded(false);
                });
        },
    });

    const uploadData = async (file: File | null) => {
        const storage = getStorage();
        const storageRef = ref(storage, formik.values.id);
        setFileUploaded(false);

        if (file) {
            setFileIsUploading(true);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await formik.setFieldValue('photoDl', url);
            setFileIsUploading(false);
            setFileUploaded(true);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Typography align="center" variant="h3" paddingBottom={4}>
                        Registration
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={(v) => formik.handleChange(v)}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    disableFuture
                                    value={formik.values.dob ? DateTime.fromSeconds(formik.values.dob) : null}
                                    onChange={(v) => formik.setFieldValue('dob', v ? v.toSeconds() : undefined)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            id="dob"
                                            name="dob"
                                            label="Date of Birth"
                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                            helperText={formik.touched.dob && formik.errors.dob}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker<DateTime>
                                    disablePast
                                    inputFormat="LL/dd hh:mm a"
                                    mask="__/__ __:__ _M"
                                    minutesStep={15}
                                    onChange={(v) => formik.setFieldValue('appointment', v ? v.toSeconds() : undefined)}
                                    value={
                                        formik.values.appointment
                                            ? DateTime.fromSeconds(formik.values.appointment)
                                            : null
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            id="appointment"
                                            name="appointment"
                                            label="Appointment Date"
                                            error={formik.touched.appointment && Boolean(formik.errors.appointment)}
                                            helperText={formik.touched.appointment && formik.errors.appointment}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color={filedUploaded ? 'success' : 'primary'}
                                    startIcon={filedUploaded ? <DoneIcon /> : <UploadFileIcon />}
                                    component="label"
                                    isLoading={fileIsUploading}
                                    disabled={fileIsUploading}
                                    fullWidth
                                    sx={{ height: '95%' }}
                                >
                                    {filedUploaded ? 'Photo DL Uploaded' : 'Upload Photo DL'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => uploadData(e.target?.files ? e.target.files[0] : null)}
                                    />
                                </Button>
                            </Grid>
                            <Grid item container xs={12} justifyContent="right">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    isLoading={formik.isSubmitting}
                                    disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};
