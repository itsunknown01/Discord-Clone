import Image from "next/image";
import React from "react";

export interface AboutProps {
  title: string;
  content: string;
  image: string;
  rowStyle: string;
  backgroundStyle: string;
}

const About = ({
  title,
  content,
  image,
  rowStyle,
  backgroundStyle,
}: AboutProps) => {
  return (
    <section className={`w-full flex items-center flex-col ${backgroundStyle}`}>
      <div
        className={`w-[1440px] box-border flex gap-[122px] p-[120px_40px] ${rowStyle}`}
      >
        <Image
          src={image}
          alt="about"
          width={678}
          height={440}
          className="col-span-7 order-1 my-auto object-cover"
        />
        <div className="col-start-9 col-end-4 order-2 mt-0 flex flex-col justify-center text-[#23272a]">
          <h2 className="text-5xl font-extrabold leading-[120%] ">{title}</h2>
          <p className="mt-[24px] text-[clamp(16px,2vw,20px)] leading-[1.625]">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;