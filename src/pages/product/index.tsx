/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductView from "@/views/Product";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
//const fetcher = (url: string) => fetch(url).then((res) => res.json()); //ini seblum kita rapihkan

//file ini menggunakan client-side-rendering

const ProductPage = () => {
    // const [isLogin, setIsLogin] = useState(false); (ini tidak bisa harus login dulu)
    //const [isLogin, setIsLogin] = useState(true); ini kita coba ganti menggunakan middleware dismpan dalam src
    const router = useRouter();
    const {push} = useRouter();
   

    //ini product
    const [products, setProducts] = useState([]);

    //console.log(products);

   
    // useEffect(() => {
    //     if (!isLogin) {
    //         router.push("/auth/login");
    //     }
    // }, [])

    
    // useEffect(() => { //kalau pakai halaman ya nongol sekilas tapi langung kembali ke home (ini tidak menggunakan middleware)
    //     push("/")
    // }, [])

    const { data, error, isLoading } = useSWR("/api/product", fetcher);
    console.log(data);
    console.log(error);
    console.log(isLoading);
    

    

    //kita ambil data dari API
//    useEffect(() => {
//        fetch("http://localhost:3000/api/product")
//        .then((res) => res.json())
//        .then((resoponse) =>{
//            setProducts(resoponse.data);
//        })
//    }, [])


    return (
       <div>
        <ProductView products={isLoading ? [] : data?.data}/> 
        {/* kalau data ya belum ada isloading kosong kalau ada datanya tampilkan */}
       </div>
    )
}

export default ProductPage;