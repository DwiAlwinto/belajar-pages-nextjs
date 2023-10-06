// import style from "@/styles/Navbar.module.css"
import {signIn, useSession, signOut} from "next-auth/react"
import style from "./Navbar.module.css"
import Script  from "next/script";
import Image from "next/image";
const Navbar = () => {
    const {data} : any = useSession();
    //console.log(data)
    return (
    <div className={style.navbar}>
        <div className="big" id="title" >Nikee</div>
            {/* <Script id="script-title" strategy="lazyOnload"> //ini untuk optimazi script
                {`document.getElementById("title").innerHTML = "Nike"`}
            </Script> */}
        <div className={style.profile}>
            
            {data && data.user.image ? (
                <Image 
                width={30}
                height={30}
                className={style.avatar} 
                src={data.user.image} 
                alt={data.user.fullName} 
                />
            ) : ""}
            {/* setting jug di next.config.js untuk avatar nya */}
            {data && data.user.fullName}{" "}
            
             {/* kita coba manipulasi data nya  */}
        {data ? (
            <button className={style.button} onClick={() => signOut()}>Sign Out</button>
         
         ) : (
            <button className={style.button} onClick={() => signIn()}>Sign In</button>
        )}
        
        </div>
       
    </div>    
    )
}

export default Navbar;