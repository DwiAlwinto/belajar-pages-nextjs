//ini menggunakan server-side-rendering
import ProductView from "@/views/Product";
import { ProductType } from "@/types/product.type";

const ProductPage = (props : {products: ProductType[] }) => {
    const { products } = props;
    return (
        <div>
            <ProductView products={products} />
        </div>
    )
}
export default ProductPage;

//server-side-rendering (menggunakan dari nextJS) : ini dipanggil setiap melakukan request
export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product`
        );
    const response = await res.json();
    console.log(response);
     
    return {
        props: {
            products: response.data,
        }
    }
}