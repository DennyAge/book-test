import React from "react";
import Image from "next/image";

const EmptyData = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-[10%]">
      <Image
        width={200}
        height={200}
        src="https://www.bookflea.co/empty.svg"
        alt="empty"
      />
      <h1 className="text-xl">Oops, I didn&#39;t find any ads</h1>
    </div>
  );
};
export default EmptyData;
