import WeddingCanvas from "./components/WeddingCanvas";
import "./styles/wedding.css";

import { Pinyon_Script, Cinzel, Montserrat, Bodoni_Moda } from "next/font/google";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`${montserrat.className} wedding-page`}>
      <WeddingCanvas />

      <div className="wedding-content">
        <div
          className={`${cinzel.className} relative flex h-[200px] w-[200px] items-center justify-center`}
        >
          {/* Vòng tròn */}
          <div className=" absolute h-[186px] w-[186px] rounded-full border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.18)] animate-[ringGlow_3s_ease-in-out_infinite]" />

          {/* Chữ H */}
          <span className={`${bodoniModa.className} absolute left-[29px] top-[45px] z-20 text-[5.5rem] font-normal leading-none text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}>
            N
          </span>

          {/* Chữ T */}
          <span
            className={`${bodoniModa.className} absolute left-[117px] top-[67px] text-[5.5rem] font-normal leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]`}
          >
            T
          </span>

          {/* Trái tim giữa N và T, cùng kiểu với trái tim bên dưới */}
          <span
            className="
              absolute
              left-[96px] top-[84px]
              z-30
              text-[1.8rem]
              text-white
              animate-[pulse_1.5s_infinite]
            "
          >
            ♥
          </span>

          {/* Ngôi sao góc trên */}
          <span
            className="
              absolute
              right-[23px] top-[15px]
              z-40
              text-[13px]
              text-white
              drop-shadow-[0_0_8px_#fff]
              animate-[sparkle_2s_ease-in-out_infinite]
            "
          >
            ✦
          </span>

          {/* Ngôi sao góc dưới */}
          <span
            className="
              absolute
              bottom-[18px] left-[20px]
              z-40
              text-[9px]
              text-white
              drop-shadow-[0_0_8px_#fff]
              animate-[sparkle_2s_ease-in-out_infinite_1s]
            "
          >
            ✦
          </span>
        </div>

        <div className="names-container">
          <div className={`${pinyonScript.className} name`}>
            Hoàng Nam
          </div>

          <div className="heart">♥</div>

          <div className={`${pinyonScript.className} name`}>
            Thảo Trang
          </div>
        </div>

        <div className="date-main">
          04 - 10 - 2026
        </div>

        <div className={`${cinzel.className} date-sub`}>
          (24 - 08 AL)
        </div>
      </div>
    </main>
  );
}