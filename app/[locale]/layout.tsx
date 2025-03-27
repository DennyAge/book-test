//core
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
//utils
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
//components
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import MobileNavbar from "@/components/MobileNavbar";
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";
//styles
import "../globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: "BookFlea test",
  description: "Create by @Denny_Age",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className={cn(inter.className, "w-screen h-dvh flex flex-col")}>
        <ThemeProviderWrapper>
          <NextIntlClientProvider>
            <Toaster />
            <Navigation />
            <main className="h-dvh flex flex-col justify-between">
              {children}
              <Footer />
            </main>
            <MobileNavbar />
          </NextIntlClientProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
