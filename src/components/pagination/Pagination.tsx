import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import type { Paginatable } from "./Pagination.types";

const Pagination = ({ totalPages, currentPageIndex, handleChangeIndex }: Paginatable): React.JSX.Element => {

    const { themeClasses } = useContext(ThemeContext);
    
    let content: React.JSX.Element = <></>;

    content = (
      <nav aria-label="Products Navigation" className="mx-auto">
        <ul className="flex items-center -space-x-px h-8 text-sm mt-4 mb-2">
          <li>
            <button
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg ${
                themeClasses.primaryBorderClass
              } ${themeClasses.textClass} ${
                currentPageIndex> 1 ? themeClasses.primaryBgHoveredClass : ""
              }`}
              onClick={() =>
                handleChangeIndex(currentPageIndex- 1)
              }
              disabled={currentPageIndex> 1 ? false : true}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight  border  ${
                  i + 1 === currentPageIndex? themeClasses.primaryBgClass : ""
                } ${themeClasses.textClass} ${
                  themeClasses.primaryBgHoveredClass
                } ${themeClasses.primaryBorderClass}`}
                onClick={() => handleChangeIndex(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border disabled rounded-e-lg ${
                themeClasses.primaryBorderClass
              } ${themeClasses.textClass} ${
                currentPageIndex< totalPages
                  ? themeClasses.primaryBgHoveredClass
                  : ""
              }`}
              onClick={() =>
                handleChangeIndex(currentPageIndex+ 1)
              }
              disabled={currentPageIndex< totalPages ? false : true}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );


  
    return content;
}

export default Pagination;
