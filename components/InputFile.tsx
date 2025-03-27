//core
import { ControllerRenderProps } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import { useTheme } from "next-themes";
import { ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
//utils
import { cn } from "@/lib/utils";
//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface FormValues {
  title: string;
  author: string;
  price: string;
  image: string[];
}

interface InputFileProps {
  field: ControllerRenderProps<FormValues, "image">;
}

const InputFile = ({ field }: InputFileProps) => {
  const { value, onChange } = field;
  const { theme } = useTheme();
  const t = useTranslations("SellForm");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = [...value];
    const fileReaders: Promise<string>[] = [];

    for (let i = 0; i < files.length && newImages.length < 5; i++) {
      const file = files[i];
      fileReaders.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
      );
    }

    Promise.all(fileReaders).then((results) => {
      const updatedImages = [...newImages, ...results].slice(0, 5);
      onChange(updatedImages);
      field.onChange(updatedImages);
    });
  };

  const removeImage = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const updatedImages = value.filter((_: never, i: number) => i !== index);
    onChange(updatedImages);
    field.onChange(updatedImages);
  };

  return (
    <div className="grid w-full">
      <Input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      {value.length === 0 ? (
        <Label
          htmlFor="file-upload"
          className="flex flex-col w-full border border-gray-200 rounded-lg cursor-pointer p-2 h-32 dark:bg-input/30 border-input"
        >
          <div className="w-full flex flex-col items-center gap-2 mt-2">
            <Image
              src="/icons/file-upload.svg"
              alt="file-upload"
              width="50"
              height="50"
              className={cn(theme === "dark" ? "invert" : "")}
            />
            <span>{t("bookImagePlaceholder")}.</span>
          </div>
          <span className="mx-auto text-xs text-muted-foreground mt-2">
            {t("bookImageSubText")}
          </span>
        </Label>
      ) : (
        <div className="flex flex-col w-full border border-gray-200 rounded-lg px-2 min-h-32 dark:bg-input/30 border-input">
          <div className="w-full flex flex-wrap gap-2 mt-2">
            {value.map((src, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border border-gray-200 rounded-md bg-white"
              >
                <Image
                  src={src}
                  alt={`preview-${index}`}
                  width="50"
                  height="50"
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-0 right-0 w-5 h-5 p-1 rounded-full border-gray-200"
                  onClick={(e) => removeImage(e, index)}
                >
                  <CgClose className="w-4 h-4 text-black" />
                </Button>
              </div>
            ))}
            {value.length < 5 && (
              <Label
                htmlFor="file-upload"
                className="w-20 h-20 flex justify-center items-center text-2xl cursor-pointer border border-gray-200 rounded-md"
              >
                <LuPlus />
              </Label>
            )}
          </div>
          <span className="mx-auto text-xs text-muted-foreground mt-4">
            {t("bookImageSubText")}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputFile;
