"use client";

//core
import { zodResolver } from "@hookform/resolvers/zod";
import { LuAsterisk } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { z } from "zod";

//store
import { useBookStore } from "@/store/books";
//utils
import { FormSchema } from "@/lib/validations";
import { useRouter } from "@/i18n/navigation";
//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/InputFile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SellPage = () => {
  const t = useTranslations("SellForm");
  const { addBook } = useBookStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      price: "",
      image: [],
    },
  });

  const onSubmit = (values: Omit<Book, "id" | "isFavorite">) => {
    addBook({ ...values });
    form.reset({
      title: "",
      author: "",
      price: "",
      image: [],
    });
    toast.success("Create success!");
    router.push("/");
  };

  return (
    <main className="relative flex flex-col md:flex-row ">
      <section className="sticky z-10 h-40 w-full sm:top-0 md:h-screen md:flex-1">
        <Image
          src="/images/sell-illustration.png"
          alt="sell-ilustration.png"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
      <section className="flex flex-col items-center space-y-12 h-full min-h-screen flex-1 md:items-center px-5 py-26">
        <h1 className="text-[2em] font-bold">{t("title")}</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("bookName")}{" "}
                    <LuAsterisk className="w-3 h-3 mb-1 text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("bookNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("author")}{" "}
                    <LuAsterisk className="w-3 h-3 mb-1 text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("authorPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("price")}{" "}
                    <LuAsterisk className="w-3 h-3 mb-1 text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input min={0} type="number" placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("bookImage")}{" "}
                    <LuAsterisk className="w-3 h-3 mb-1 text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <InputFile field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" type="submit">
              {t("btnText")}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};
export default SellPage;
