import { Form, useFormik } from 'formik';
import { FC } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Button } from '../Library/Index';
import * as Yup from 'yup';
import { phoneValidation } from '../../Utils/String';

const formValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    // phone: Yup.string().matches(phoneValidation, 'Enter a valid phone number').required('Phone is required'),
    phone: Yup.string()
        .test('phone-test', 'Enter a valid phone number', (value) => phoneValidation.test(value || ''))
        .required('Phone is required'),
    email: Yup.string().email('Enter a valid Email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    photoDL: Yup.string().required('Photo DL is required'),
    appointmentDate: Yup.string().required('Appointment Date is required'),
});

export const Registration: FC = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            photoDL: '',
            appointmentDate: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 3000);
        },
    });
    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
                <Typography align="center" variant="h3">
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
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="photoDL"
                                name="photoDL"
                                label="Photo DL"
                                value={formik.values.photoDL}
                                onChange={formik.handleChange}
                                error={formik.touched.photoDL && Boolean(formik.errors.photoDL)}
                                helperText={formik.touched.photoDL && formik.errors.photoDL}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="appointmentDate"
                                name="appointmentDate"
                                label="Appointment Date"
                                value={formik.values.appointmentDate}
                                onChange={formik.handleChange}
                                error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                                helperText={formik.touched.appointmentDate && formik.errors.appointmentDate}
                            />
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
    );
};

// return (
//     <Formik
//         initialValues={{
//             name: '',
//             phone: '',
//             email: '',
//             address: '',
//             photoDL: '',
//             appointmentDate: '',
//         }}
//         onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//                 alert(JSON.stringify(values, null, 2));
//                 setSubmitting(false);
//             }, 3000);
//         }}
//     >
//         {({ isSubmitting }) => (
//             <Form>
//                 <Field type="text" name="name" placeholder="Name" />
//                 <Field type="text" name="phone" placeholder="Phone" />
//                 <Field type="text" name="email" placeholder="Email" />
//                 <Field type="text" name="address" placeholder="Address" />
//                 <Field type="text" name="photoDL" placeholder="Photo DL" />
//                 <Field type="text" name="appointmentDate" placeholder="Appointment Date" />
//             </Form>
//         )}
//     </Formik>
// );
// };
