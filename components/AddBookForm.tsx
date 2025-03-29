"use client";

//core
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { LuAsterisk } from "react-icons/lu";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
//utils
import { FormSchema } from "@/lib/validations";
import { addBook } from "@/lib/actions/books";
import { useRouter } from "@/i18n/navigation";
//components
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AddBookForm = () => {
  const t = useTranslations("SellForm");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      price: "",
      images: [],
    },
  });

  const onSubmit = async (
    values: Omit<Book, "id" | "isFavorite" | "createdAt">,
  ) => {
    try {
      await addBook({ ...values });
      form.reset({
        title: "",
        author: "",
        price: "",
        images: [],
      });
      toast.success("Create success!");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("bookImage")}{" "}
                <LuAsterisk className="w-3 h-3 mb-1 text-red-500" />
              </FormLabel>
              <FormControl>
                <ImageUpload field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" type="submit" disabled={!form.formState.isValid}>
          {t("btnText")}
        </Button>
      </form>
    </Form>
  );
};
export default AddBookForm;
