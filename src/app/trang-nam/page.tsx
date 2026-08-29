import WeddingCanvas from "../components/WeddingCanvas";
import "../styles/wedding.css";

import { Pinyon_Script, Cinzel, Montserrat } from "next/font/google";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "600"],
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
          className={`${cinzel.className} relative flex h-[300px] w-[300px] items-center justify-center`}
        >
          {/* Vòng tròn */}
          <div className=" 
            left-[20px] top-[65px] 
      
            " />

          {/* Chữ H */}
          <span className={`${pinyonScript.className} absolute 
            left-[45px] top-[130px] 
            z-20 text-[5.5rem] font-normal leading-none text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}>
            T
          </span>

          {/* Chữ T */}
          <span
            className={`${pinyonScript.className} absolute 
              left-[160px] 
              top-[180px] text-[5.5rem] font-normal leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]`}
          >
            N
          </span>

          {/* Trái tim giữa N và T, cùng kiểu với trái tim bên dưới */}
          <span
            className="
              absolute
              left-[132px] top-[155px]
              z-30
              text-[1.8rem]
              text-white
              animate-[pulse_1.5s_infinite]
            "
          >
            &
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
            Thảo Trang
          </div>

          <div className="heart">♥</div>

          <div className={`${pinyonScript.className} name`}>
            Hoàng Nam
          </div>
        </div>

        <div className="date-main">
          27 - 09 - 2026
        </div>

        <div className={`${cinzel.className} date-sub`}>
          (17 - 08 AL)
        </div>
      </div>
    </main>
  );
}