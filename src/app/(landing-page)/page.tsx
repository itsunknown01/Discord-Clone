import About from "@/components/landing-page/about";
import HeroSection from "@/components/landing-page/hero-section";
import { aboutData } from "@/constants/landing-page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full overflow-x-hidden">
      <div className="w-full box-border flex justify-center items-center gap-[0_20px] py-[120px] min-h-[626px] bg-[url(/background.svg)] relative">
        <HeroSection />
      </div>
      {aboutData.map((item, index) => (
        <About
          key={index}
          title={item.title}
          content={item.content}
          image={item.image}
          rowStyle={index % 2 === 0 ? "" : "flex-row-reverse"}
          backgroundStyle={index % 2 === 0 ? "bg-white" : "bg-zinc-100"}
        />
      ))}
      <section className={`w-full flex items-center flex-col bg-[#f6f6f6]`}>
        <div className={`w-[1440px] box-border p-[120px_40px] `}>
          <div className="col-start-9 col-end-4 order-2 mt-0 flex flex-col justify-center items-center w-[980px] mx-auto text-[#23272a]">
            <h2 className="text-5xl uppercase font-extrabold leading-[120%] ">
              Reliable tech for staying close
            </h2>
            <p className="mt-[24px] text-[clamp(16px,2vw,20px)] leading-[1.625]">
              Low-latency voice and video feels like you’re in the same room.
              Wave hello over video, watch friends stream their games, or gather
              up and have a drawing session with screen share.
            </p>
          </div>
          <Image
            src="/bottomBanner.svg"
            alt="about"
            width={1180}
            height={716}
            className="flex justify-center items-center mx-auto my-auto object-cover"
          />
        </div>
      </section>

      <section className="w-full bg-[#f6f6f6] flex items-center flex-col">
        <div className="mb-[120px] flex justify-center flex-col items-center flex-wrap relative w-[1260px] box-border gap-y-5 py-10">
          <h4 className="mt-[30px] z-[1] font-bold text-[32px] leading-[120%]">
            Ready to start your journey?
          </h4>
          <Link
            href={"/"}
            className="mr-[24px] mt-[24px] rounded-[28px] text-xl p-[16px_32px] bg-[#5865f2] text-white leading-[24px] inline-flex font-normal items-center box-border"
          >
            <Image src="/hero.svg" alt="download icon" width={24} height={24} />
            Download for Windows
          </Link>
        </div>
      </section>
    </main>
  );
}
