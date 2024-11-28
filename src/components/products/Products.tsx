import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Spinner from "../utility/Spinner";
import type { ProductData } from "./Product.types";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";

const Products = ():React.JSX.Element => {

  const { themeClasses } = useContext(ThemeContext);

  const [productPageNumber, setProductPageNumber] = useState<number>(1);
  const [viewItemsLimit, setViewItemsLimit] = useState<number>(6);

  const handleChangeViewItemsLimit = (itemsLimit:number) => { 
    setViewItemsLimit(itemsLimit)
    setProductPageNumber(1);
  };

  const handleChangeProductPageNumber = (newPageNumber: number) => newPageNumber !== productPageNumber ? setProductPageNumber(newPageNumber) : null;

  const {
    data: apiData,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({ page: productPageNumber, limit: viewItemsLimit });

  let content: React.JSX.Element = <></>;

  if (isLoading) {
    content = <Spinner/>
  } else if (isSuccess) {
    
    if(apiData.productList && apiData.productList !== null && apiData.productList.length > 0) {
        
    content = (
      <>
        <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-3">
          <h2
            className={`col-start-2 my-3 mx-auto text-center text-2xl py-2 font-bold ${themeClasses.textClass}`}
          >
            Our Products
          </h2>
          <div className="flex items-center justify-end gap-2 pr-4">
            <label
              htmlFor="view-number"
              className={`text-sm font-medium ${themeClasses.textClass}`}
            >
              View
            </label>
            <select
              name="view-number"
              id="view-number"
              className={`w-16 p-2 text-center  rounded-md ${themeClasses.primaryBgClass} focus:border focus:${themeClasses.primaryBorderClass} `}
              value={viewItemsLimit}
              onChange={(e) =>
                handleChangeViewItemsLimit(Number(e.target.value))
              }
            >
              <option data-testid={``} value="6">
                6
              </option>
              <option data-testid={``} value="9">
                9
              </option>
              <option data-testid={``} value="12">
                12
              </option>
            </select>
          </div>
        </div>

        <Search categoriesList={apiData.categoryList}/>
        <div
          className={`max-w-screen-2xl w-full mx-auto 2xl:border  rounded-lg py-10 ${themeClasses.primaryBorderClass}`}
        >
          <div className="w-11/12 lg:w-5/6 text-center mx-auto ">
            <div className="flex justify-evenly flex-wrap gap-10">
              {apiData.productList.map(
                (product: ProductData): React.JSX.Element => {
                  return <ProductCard key={product.id} productData={product} />;
                }
              )}
            </div>
          </div>
        </div>
        <Pagination
          totalPages={apiData.totalPages}
          currentPageIndex={productPageNumber}
          handleChangeIndex={handleChangeProductPageNumber}
        />
      </>
    );
  } else  {
    content = (
      <div className="max-w-screen-2xl w-full mx-auto flex flex-col">
        <h2
          className={`col-start-2 my-3 mx-auto text-center text-2xl py-2 font-bold ${themeClasses.textClass}`}
        >
          Our Products
        </h2>
        <div
          className={`max-w-screen-2xl w-full mx-auto 2xl:border  rounded-lg py-10 ${themeClasses.primaryBorderClass}`}
        >
          <div className="w-11/12 lg:w-5/6 text-center mx-auto ">
            <h3>No Products found</h3>
          </div>
        </div>
      </div>
    );
  } 

  } else if (isError) {
    content = (
      <div className="max-w-screen-2xl w-full mx-auto flex flex-col">
        <h2
          className={`col-start-2 my-3 mx-auto text-center text-2xl py-2 font-bold ${themeClasses.textClass}`}
        >
          Our Products
        </h2>
        <div
          className={`max-w-screen-2xl w-full mx-auto 2xl:border  rounded-lg py-10 ${themeClasses.primaryBorderClass}`}
        >
          <div className="w-11/12 lg:w-5/6 text-center mx-auto ">
            <h3>OOPS! Something went wrong!</h3>
          </div>
        </div>
      </div>
    );    
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
