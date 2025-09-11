"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBooking } from "./data-service";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...bookingData, guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed",
    };

    console.log(newBooking);


    const { error } = await supabase.from("bookings").insert([newBooking]);

    if (error) throw new Error("Booking could not be created");

    revalidatePath(`/cabins/${bookingData.cabinId}`);

    redirect("/cabins/thankyou");

}

export async function deleteBooking(bookingId) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const booking = await getBooking(bookingId);
    if (!booking) throw new Error("Booking not found");

    const isOwner = booking.guestId === session.user.guestId;
    if (!isOwner) throw new Error("You can only delete your own reservations");

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) throw new Error("Booking could not be deleted");

    revalidatePath("/account/reservations");
}
export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");

    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national ID");

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId);

    if (error) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");
}

export async function updateBooking(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const { id, guestId, ...updatedFields } = Object.fromEntries(formData.entries());


    const isOwner = Number(guestId) === session.user.guestId;
    if (!isOwner) throw new Error("You can only delete your own reservations");



    const { error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    revalidatePath(`/account/reservations/edit/${id}`);

    redirect('/account/reservations');

}