/* eslint-disable @next/next/no-img-element */
import style from "@/styles/404.module.scss"
import Image from "next/image";

const Costum404 = () => {
    return (
        <div className={style.error}>
            {/* <img src="/404.png" alt="404" className={style.error__image}/> */}
            <Image src="/404.png"
             alt="404" 
             width={600} 
             height={600}
             className={style.error__image}
              />
            <div>404 | Halaman Tidak Ditemukan</div>
        </div>
    )
}

export default Costum404;