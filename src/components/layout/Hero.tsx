import Slider from "../hero/Slider";
import demoImg from "../hero/demo.png";
import demoImg2 from "../hero/demo2.jpg";
import demoImg3 from "../hero/demo3.jpg";
import demoImg4 from "../hero/demo4.jpg";

const carouselImagesData: string[] = [demoImg, demoImg2, demoImg3, demoImg4];
const Hero = ():React.JSX.Element => {
    
    const content: React.JSX.Element = (
      <div className="max-w-screen-2xl w-full h-[500px] mx-auto my-auto">
        <Slider carouselImagesData = {carouselImagesData} />
      </div>
    );

    return content;
}

export default Hero;
