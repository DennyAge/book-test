import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { ChangeEvent, useCallback, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslations } from "next-intl";
import { CgClose } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import Image from "next/image";
// utils
import config from "@/lib/config";
// components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";

interface FormValues {
  images: string[];
  title: string;
  author: string;
  price: string;
}

interface InputFileProps {
  field: ControllerRenderProps<FormValues, "images">;
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
    if (!response.ok) throw new Error("Failed to authenticate ImageKit");
    return await response.json();
  } catch (error: unknown) {
    toast.error("Image upload authentication failed");
    throw error;
  }
};

const ImageUpload = ({ field }: InputFileProps) => {
  const { value, onChange } = field;
  const t = useTranslations("SellForm");

  const [loading, setLoading] = useState(false);

  const onUploadSuccess = useCallback(
    (res: any) => {
      if (value.length >= 5) return;
      const updatedImages = [...value, res.url].slice(0, 5);
      onChange(updatedImages);
      setLoading(false);
    },

    [value, onChange],
  );

  const onUploadError = useCallback(() => {
    toast.error("Image upload failed. Try again.");
  }, []);

  const removeImage = useCallback(
    (index: number) => {
      const updatedImages = value.filter((_, i) => i !== index);
      onChange(updatedImages);
    },
    [value, onChange],
  );

  const onUploadStart = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setLoading(false);
      toast.error("Only image files are allowed.");
      return;
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="grid w-full">
        {value.length === 0 ? (
          <Label
            className="flex flex-col w-full border border-gray-200 rounded-lg cursor-pointer p-2 h-32 dark:bg-input/30 border-input"
            htmlFor="file-upload"
          >
            <div className="w-full flex flex-col items-center gap-2 mt-4">
              <Image
                src="/icons/file-upload.svg"
                alt="file-upload"
                width="50"
                height="50"
                className="logo invert w-10 h-12"
                loading="lazy"
              />
              <span>{t("bookImagePlaceholder")}.</span>
            </div>
            <span className="mx-auto text-xs text-muted-foreground ">
              {t("bookImageSubText")}
            </span>
          </Label>
        ) : (
          <div className="flex flex-col w-full border border-gray-200 rounded-lg px-2 py-4 min-h-36 dark:bg-input/30 border-input">
            <div className="w-full flex flex-wrap gap-2 ">
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
                    priority
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-0 right-0 w-5 h-5 p-1 rounded-full dark:bg-white bg-white border-gray-200 "
                    onClick={() => removeImage(index)}
                  >
                    <CgClose className="w-4 h-4 text-black" />
                  </Button>
                </div>
              ))}
              {value.length < 5 && (
                <Label
                  className="w-20 h-20 flex justify-center items-center text-2xl cursor-pointer border border-gray-200 rounded-md "
                  htmlFor="file-upload"
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

        <IKUpload
          className="hidden"
          id="file-upload"
          onError={onUploadError}
          onUploadStart={onUploadStart}
          onSuccess={onUploadSuccess}
          fileName="book-image"
        />

        {loading && <Loader />}
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;
