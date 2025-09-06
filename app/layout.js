import Header from "./_components/Header";

// import { Josefin_Sans } from "next/font/google";
// const josefin = Josefin_Sans({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s | Vinhomes Resort",
    default: "Welcome | Rent Cabins",
  },
  description:
    "Luxury Cabins hotel, located in the heart of the Italian Dolomites. The perfect spot for a peaceful, calm vacation. Welcome to paradise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      // className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12  ">
          <main className=" mx-auto max-w-7xl text-white ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
