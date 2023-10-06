import { useRouter } from "next/router"

const ShopProduct = () => {
    const {query} = useRouter();
    // console.log(router);
    //console.log(query);
    
    
    return (
        <div>
            <h1> Shop Product </h1>
            <p>Shop : {`${query.slug && query.slug[0] + "-" + query.slug[1]}`} </p>
            {/* kita ganti aja di link url ya : http://localhost:3000/product/Nike */}
        </div>
    )
}

export default ShopProduct