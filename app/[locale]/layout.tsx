//core
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { Metadata } from "next";
//utils
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
//components
import Navigation from "@/components/Navigation";
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

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  const theme = (await headers()).get("x-theme") || "light";

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className={theme} lang={locale}>
      <body className={cn(inter.className, "w-screen h-dvh flex flex-col")}>
        <NextIntlClientProvider>
          <Toaster />
          <Navigation />
          <main className="flex-1 flex flex-col md:mt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
