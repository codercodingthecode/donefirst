import { DateTime } from 'luxon';

export interface Register {
    id: string;
    name: string;
    dob?: number;
    phone: string;
    email: string;
    photoDl: string;
    address: string;
    appointment?: number;
}
