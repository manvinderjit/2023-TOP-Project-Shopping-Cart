import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Spinner from "../utility/Spinner";
import type { ProductData } from "./Product.types";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Products = ():React.JSX.Element => {

  const { themeClasses } = useContext(ThemeContext);

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
    content =  <>
                <h2 className={`my-3 text-center text-2xl py-2 font-bold ${themeClasses.textClass}`}>Our Products</h2>
                  <div className="w-11/12 lg:w-5/6 xl:w-4/5 text-center mx-auto ">
                    <div className="flex justify-evenly flex-wrap gap-10">
                          {apiData.productList.map((product: ProductData): React.JSX.Element => {
                            return (
                              <ProductCard key={product.id} productData={product} />
                            )
                          })}
                    </div>
                  </div>
              </>
  } else if (isError) {
    content = <div>{error.data}</div>
  }

  return (
    <section id="section-products">
      <div className="w-full flex flex-col justify-center">
          {content}
      </div>
    </section>
  );
}

export default Products;
