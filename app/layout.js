import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Footer from "./_components/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel Hub",
  description: "Hacker bhai...",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <SignedOut> 
        </SignedOut>
        <SignedIn>
          {/* <UserButton showName/> */}
        </SignedIn>
        {children}
        <Analytics />
        <Footer/>
        </body>
    </html>
    </ClerkProvider>
  );
}