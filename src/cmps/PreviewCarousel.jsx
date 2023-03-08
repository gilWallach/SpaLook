import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { SpaPreview } from "./SpaPreview";

export function PreviewCarousel({ spas, isLabelSearch = false, selectedLabel = null , isModal=false }) {
  const { pathname } = useLocation();

  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows:false,
    slidesToShow: 6.3,
    slidesToShow: 5.3,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 5.3,
          slidesToScroll: 5.3,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3.5,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4.1,
          slidesToScroll: 3.1,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2.5,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 2.1,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1.5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1.3
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1.1
        }
      }
    ]
  };
  if (spas) {
    return (
      <section className="spa-list">
        {isLabelSearch && selectedLabel && <h2>{selectedLabel.name}</h2>}
        {!pathname.includes("search") && !selectedLabel && !isModal && (
          <h2> {spas[0].categories}</h2>
        )}
        <ul className="carousel-list">
          <Slider {...sliderSettings}>
          {spas.map((spa) => (
            <SpaPreview key={`carousel_${spa._id}`} spa={spa} isModal={isModal} />
          ))}
          </Slider>
        </ul>
      </section>

    )
  }
}
