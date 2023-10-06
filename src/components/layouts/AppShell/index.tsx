// import { type } from "os";
// import Navbar from "../Navbar"; //ini diganti dengan dynamic next
import { useRouter } from "next/router";

//ini untuk optimization font 
import { Roboto } from "next/font/google"

//ini untuk next-dynamic
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import('../Navbar'))

type AppShellProps = {
    children: React.ReactNode
}

const roboto = Roboto({
    subsets : ["latin"],
    weight: ["400", "700"]
})

//Membuat kondisi disable Navbar
const disableNavbar = ["/auth/login", "/auth/register", "/404"]  //ini navbar tidak akan dtemukan

const AppShell = (props : AppShellProps) => {
    const {children} = props;
    // const router = useRouter();
    const {pathname} = useRouter();
    // console.log(router);

    console.log(pathname);
    
    
    return (
        <main className={roboto.className}>
            {/* mematikn Navbar  dan Navbar ya menggunakan kondisionale rendering*/}
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell;