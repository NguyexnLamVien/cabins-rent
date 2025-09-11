'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBooking } from '../_lib/action';


export default function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDeletes] = useOptimistic(
        bookings,
        (curBookings, bookingId) => {
            return curBookings.filter((booking) => booking.id !== bookingId);


        }
    );

    async function handleDelete(bookingId) {
        optimisticDeletes(bookingId);
        await deleteBooking(bookingId);

    }

    return (
        <ul className="space-y-6">
            {bookings.map((booking) => (
                <ReservationCard
                    booking={booking}
                    key={booking.id}
                    onDelete={handleDelete}
                />
            ))}
        </ul>
    );
}
