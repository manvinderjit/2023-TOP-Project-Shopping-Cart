import { useState, useEffect } from "react";
import Slider from "../hero/Slider";

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

const Hero = ():React.JSX.Element => {

  const [carouselImagesData, setCarouselImagesData] = useState<CarouselImagesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const controller = new AbortController();
      async function fetchData() {
        const response = await fetch(
          `https://ia.manvinderjit.com/api/promos/carousel`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(3000),
          }
        )
          .then((raw) => raw.json())
          .then((data) => data)
          .catch((error) => console.log(error));
        setCarouselImagesData(response.carouselPromos);
        setLoading(false);
      }
      fetchData();
      return () => controller.abort();
    }, []);

    const content: React.JSX.Element = (
      <div className="max-w-screen-2xl w-full h-[500px] mx-auto">
        {loading ? (
          "...loading"
        ) : (
          <Slider carouselImagesData = { carouselImagesData }/>
        )}
      </div>
    );

    return content;
}

export default Hero;
