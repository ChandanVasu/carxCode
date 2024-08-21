import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/template/header"
import Footer from "@/components/template/footer"



const inter = Poppins({ subsets: ["latin"], weight: ['100', '300', '700'], variable: '--poppins-font' });

export const metadata = {
  title: "Premium Car Dealer - Find Your Dream Car",
  description: "Explore a wide range of premium new and used cars at unbeatable prices. Discover your next vehicle with us today!",
};


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>
        <Header></Header>
        {children}
        <Footer></Footer>
      </Providers></body>
    </html>
  );
}
