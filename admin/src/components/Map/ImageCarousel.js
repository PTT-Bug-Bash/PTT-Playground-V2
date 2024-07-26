import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from "semantic-ui-react";

/* Used when there are 3 or more images */
function ImageCarousel({imageUrls}) {
  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  };
  return (
    <Carousel 
      responsive={responsive}
      centerMode={false}
      showDots={true}
      containerClass="gallery-container"
      draggable={true}
    >
      {imageUrls.map((imageUrl) => (
        <Image
          draggable={false}
          src={imageUrl}
          className="gallery-image"
        />
    ))}
    </Carousel>
  );
}

export default ImageCarousel;