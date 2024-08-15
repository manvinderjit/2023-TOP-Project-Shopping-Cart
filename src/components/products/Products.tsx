import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Spinner from "../utility/Spinner";

interface ProductData {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
  imageFilename: string,
  category: {
    _id: string,
    name: string,
  };
  price: string,
  stock: number,  
  url: string,
}

const Products = ():React.JSX.Element => {
  const {
    data: apiData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery(undefined);

  let content: React.JSX.Element = <></>;

  if (isLoading) {
    content = <Spinner/>
  } else if (isSuccess) {
    content =  <div className="flex justify-evenly flex-wrap gap-10">
                {apiData.productList.map((product: ProductData): React.JSX.Element => {
                  return (
                    <ProductCard key={product.id} productData={product} />
                  )
                })}
              </div>
  } else if (isError) {
    content = <div>{error as string}</div>
  }

  return (
    <section id="section-products">
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-center text-xl py-2 font-semibold">Our Products</h2>
        <div className="w-11/12 lg:w-5/6 xl:w-4/5 text-center mx-auto ">
          {content}
        </div>
      </div>
    </section>
  );
}

export default Products;
