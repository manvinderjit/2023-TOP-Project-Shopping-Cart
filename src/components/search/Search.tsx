import { SetStateAction, useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface SearchBarProps {
  categoriesList? : {
    _id: string,
    name: string
  }[];
}

const Search = (props:SearchBarProps) => {
    const { themeClasses } = useContext(ThemeContext);
    const [selectedCategory, setSelectedCategory] = useState<string>('1');

    const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setSelectedCategory(e.target.value);
    };

  return (
    <div className="flex flex-col items-center">
      <form className="mx-auto">
        <div className="flex w-full min-w-72 sm:min-w-[540px] md:min-w-[600px] mb-8">
          <select
            id="searh-dropdown"
            data-dropdown-toggle="dropdown"
            className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-s-lg shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset ${themeClasses.inputRingClassPrimary} focus:ring-indigo-600 ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
            onChange={handleCategoryChange}
          >
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
            <option value={""}>All</option>;
            {props.categoriesList && props.categoriesList.map((category) => {
              return <option value={category._id}>{category.name}</option>;
            })}
          </select>

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className={`block p-2.5 w-full z-20 text-sm rounded-e-lg ${themeClasses.primaryBorderClass} border-y-[1px]
                 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
              placeholder="Enter search keywords..."
              required
            />
            <button
              type="submit"
              className={`absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white ${themeClasses.primaryBgClass} rounded-e-lg border ${themeClasses.primaryBorderClass} ${themeClasses.primaryBgHoveredClass} focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
