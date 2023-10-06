import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router"
import useSWR from "swr";
import DetailProduct from "@/views/DetailProduct";
import { ProductType } from "@/types/product.type";


const DetailProductPage = ({ product }: {product: ProductType}) => {
    const {query} = useRouter();

      {/* ini untuk client-side-rendering  */}
       // const { data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);
 
    
    
    return (
        <div>
            {/* ini untuk client-side-rendering  */}
            {/* <DetailProduct product={isLoading ? {} : data.data} /> */}

            {/* Server Side Rendering */}
            {/* <DetailProduct product={product} /> */}

            {/* Get site generation */}
            <DetailProduct product={product} />


            {/* <p>Product : {query.product} </p> */}
            {/* kita ganti aja di link url ya : http://localhost:3000/product/Nike */}
        </div>
    )
}

export default DetailProductPage;



//ini cara ambil data untuk lihat detailproduct menggunakan Server-side-Rendering
export async function getServerSideProps({
    params,
} : {
    params: {product: string};
}) {
    //console.log(params.product);
    
    //untuk fetch data
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.product}`);
    const response = await res.json();

    return {
        props: {
            product: response.data,
        }
    }
}


//untuk akses api/product kita haru mendaftarkan list product ya,
// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:3000/api/product");
//     const response = await res.json();
    
//     const paths = response.data.map((product: ProductType) => ({
//         params: {
//             product: product.id //product depan sesuaikan dengan nam file ya
//         }
//     }))
//     return {paths, fallback: false}
// }

// ini cara menggunakan getStaticProps
// export async function getStaticProps({
//     params,
// } : {
//     params: {product: string};
// }) {
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
//     const response = await res.json();
     
//     return {
//         props: {
//             product: response.data,
//         },
//         revalidate: 10, //auto build tanpa kita harus build ulang sekali build
        
//     }
// }