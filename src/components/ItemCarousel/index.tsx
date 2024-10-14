import { Item } from "../../types/item";
import Slider from "../Slider";
import CarouselItem from "./Item";

interface CarouselProps {
  items: Item[];
  title?: string;
}

const ItemCarousel: React.FC<CarouselProps> = ({ items, title }) => {

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      responsive: [
          {
              breakpoint: 1920,
              settings: {
                  slidesToShow: 5,
                  slidesToScroll: 2,
              }
          },
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2,
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
          }
      ]
  };

  return (
      <div>
          {title && <p className='subpixel-antialiased text-dark text-3xl pl-2 pt-2 pb-3'>{title}</p>}
          <Slider settings={settings}>
              {items.map((item, index) => (
                  <CarouselItem key={index} {...item} />
              ))}
          </Slider>
      </div>
  );
};

export default ItemCarousel;