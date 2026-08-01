import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_ui/navBar";
import Footer from "./_ui/Footer";
import { AuthProvider } from "./_ui/AuthProvider";
import ThemeToggle from "./_ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silas Barimah Incorporated",
  description: "Actively, Evolve.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
          <div className="fixed bottom-4 right-4 z-[100]">
            <ThemeToggle />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
