import { memo } from "react";
import Slider from "../hero/Slider";
import { useGetCarouselQuery } from '../../features/api/apiSlice';
import Spinner from "../utility/Spinner";

interface CarouselImagesData {
  caption: {
    heading: string;
    description: string;
  };
  name: string;
  category: string;
  imageUrl: string;
  url: string;
  id: null;
}

interface CarouselData {
  data: { carouselPromos: CarouselImagesData[]};
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: string,
}

const Hero = ():React.JSX.Element => {
  const {
    data: carouselPromos,
    isLoading,
    isSuccess,
    isError,
    error,
  }: CarouselData = useGetCarouselQuery();

    let content: React.JSX.Element = <></>;
    if (isLoading) {
      content = <Spinner/>
    } else if (isSuccess) {
      content =  <Slider carouselImagesData={carouselPromos.carouselPromos} />;
    } else if (isError) {
      content = <div>{error}</div>;
    }
    return (
      <div className="max-w-screen-2xl w-full h-[500px] mx-auto">
        {content}
      </div>
    );
    
}

function areItemsEqual({ item: prevItem }, { item: nextItem }){
    return Object.keys(prevItem).every(key => {
        return (
          prevItem[key] ===
          nextItem[key]
        );
    })
}

const MemoizedHero = memo(Hero, areItemsEqual);

export default MemoizedHero;