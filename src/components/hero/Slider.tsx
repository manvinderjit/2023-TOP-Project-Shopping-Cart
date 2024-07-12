import { useEffect, useState } from "react";

interface CarouselImagesDatable {
  carouselImagesData: string[]
}

const Slider = ( {carouselImagesData}: CarouselImagesDatable):React.JSX.Element => {

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const showNextImage = () => {
      setCurrentImageIndex( index => {
        if(index === carouselImagesData.length - 1){
            return 0;
        } else {
          return index + 1;
        }       
      });
    };

    const showPreviousImage = () => {
      setCurrentImageIndex( index => {
        if(currentImageIndex === 0) {
          return carouselImagesData.length - 1;
        } else {
          return index - 1;
        }
      })
    };

    const content: React.JSX.Element = (
      <section
        aria-label="Hero Image Slider"
        className="w-full h-full relative mx-auto my-auto"
      >
        <div className="w-full h-full flex flex-row overflow-hidden">
          {carouselImagesData.map((img, index) => (
            <img
              key={img}
              src={img}
              alt={img}
              aria-hidden={currentImageIndex !== index}
              className="w-full h-full object-cover block flex-shrink-0 flex-grow-0 translate-x-0 translate-y-0 duration-300 ease-in-out"
              style={{ translate: `${-100 * currentImageIndex}%` }}
            />
          ))}
          
        </div>
        <button
          aria-label="previousSliderImage"
          className="block border-none absolute top-0 bottom-0 p-4 cursor-pointer left-0 hover:bg-black hover:bg-opacity-20 hover:border-none transition ease-in-out duration-500"
          onClick={showPreviousImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          aria-label="nextSliderImage"
          className=" block border-none absolute top-0 bottom-0 p-4 cursor-pointer right-0 hover:bg-black hover:bg-opacity-20 hover:border-none transition ease-in-out duration-500 "
          onClick={showNextImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="w-full absolute bottom-5 flex justify-center">
          <div className="flex gap-2">
            {carouselImagesData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View Image ${index + 1}`}
                className={
                  index === currentImageIndex
                    ? "w-7 h-[0.35rem] bg-white bg-opacity-100 border border-gray-700"
                    : "w-7 h-[0.35rem] bg-gray-400 bg-opacity-100 border border-gray-700"
                }
              />
                
              
            ))}
          </div>
        </div>
      </section>
    );

    useEffect(() => {
      const heroSliderTimer = setTimeout(() => { showNextImage(); }, 3000);
      return () => {
        clearTimeout(heroSliderTimer);
      };     
    });
  
    return content;
}

export default Slider;
