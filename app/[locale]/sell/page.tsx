//core
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import Image from "next/image";
import { Metadata } from "next";
//components
import AddBookForm from "@/components/AddBookForm";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Sell Book",
  description: "Create by @Denny_Age",
};

const SellPage = () => {
  const t = useTranslations("SellForm");

  return (
    <Suspense fallback={<Loader />}>
      <section className="relative flex flex-col md:flex-row border-y border-gray-200">
        <section className="h-40 w-full sm:top-0 md:h-screen md:flex-1">
          <Image
            src="/images/sell-illustration.png"
            alt="sell-ilustration.png"
            width={1000}
            height={1000}
            className="size-full object-cover"
            priority
          />
        </section>
        <section className="flex flex-col items-center space-y-12 h-full min-h-screen flex-1 md:items-center px-5 py-26">
          <h1 className="text-[2em] font-bold">{t("title")}</h1>
          <AddBookForm />
        </section>
      </section>
    </Suspense>
  );
};
export default SellPage;
