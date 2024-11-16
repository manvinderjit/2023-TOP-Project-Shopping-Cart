import Slider from "../hero/Slider";
import { useGetCarouselQuery } from '../../features/api/apiSlice';
import Spinner from "../utility/Spinner";

const Hero = ():React.JSX.Element => {
  const {
    data: dataCarouselPromos,
    isLoading: isLoadingCarouselPromos,
    isSuccess: isSuccessCarouselPromos,
    isError: isErrorCarouselPromos,
    error: errorCarouselPromos,
  } = useGetCarouselQuery(undefined);

  let content: React.JSX.Element = <></>;
  if (isLoadingCarouselPromos) {
    content = <Spinner />;
  } else if (isSuccessCarouselPromos) {
    content = <Slider carouselPromos={dataCarouselPromos.carouselPromos} />;
  } else if (isErrorCarouselPromos) {
    content = <div>{JSON.stringify(errorCarouselPromos)}</div>;
  }
  return (
    <div className="max-w-screen-2xl w-full h-[500px] mx-auto">
      {content}
    </div>
  );
}

export default Hero;
