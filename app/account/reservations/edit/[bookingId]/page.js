
import SpinnerMini from '@/app/_components/SpinnerMini';
import SubmitButton from '@/app/_components/SubmitButton';
import { updateBooking } from '@/app/_lib/action';
import { getBooking, getCabin } from '@/app/_lib/data-service';

export async function generateMetadata({ params }) {
  const { bookingId } = params

  return {
    title: `Booking ${bookingId} | Vinhomes Resort`,
  };
}

export default async function Page({ params }) {
  const { bookingId: reservationId } = params
  const { observations, numGuests, cabinId, guestId } = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(cabinId);


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form action={updateBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type='hidden' name='id' value={reservationId} />
        <input type='hidden' name='guestId' value={guestId} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
          >
            <option value={''} key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel={<SpinnerMini />}>Update reservation</SubmitButton>
        </div>
      </form>
    </div>
  );
}

