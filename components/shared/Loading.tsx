import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
};

const Loading = ({ size = 100 }: Props) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Image src={"/logo.svg"} alt="logo" width={size} height={size} className="animate-pulse duration-700" />
    </div>
  );
};

export default Loading;
