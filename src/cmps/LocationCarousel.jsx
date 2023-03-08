import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { useNavigateSearch } from "../customHooks/useNavigateSearch";
import { LocationPreview } from "./LocationPreview";
import { useState } from "react";

export function LocationCarousel({
  labels,
  isLabelSearch = false,
  selectedLabel = null,
  handleClick,
  selectedCity = ''
}) {
  const [localLabels, setLocalLabels] = useState(labels)
  const { pathname } = useLocation();
  const navigate = useNavigateSearch();


  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows:false,
    slidesToShow: handleClick ? 6.3 : 7,
    slidesToScroll: handleClick ? 5.3 : 0,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: handleClick ? 5.5 : 7,
          slidesToScroll: handleClick?  4.5 : 0,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: handleClick ? 5.3 : 7,
          slidesToScroll: handleClick ? 5.3 : 0,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: handleClick ? 4.5 : 7,
          slidesToScroll: handleClick ? 3.5 : 0,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: handleClick ? 4.1 : 6.3,
          slidesToScroll: handleClick ? 3.1 : 5.3,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: handleClick ? 3.5 : 5.5,
          slidesToScroll: handleClick ? 2.5 : 4.5,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: handleClick ? 3.5 : 5.3,
          slidesToScroll: handleClick ? 2.5 : 4.3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: handleClick ? 3.1 : 4.5,
          slidesToScroll: handleClick ? 2.1 : 3.5,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: handleClick ? 2.5 : 4.3,
          slidesToScroll: handleClick ? 1.5 :3.3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: handleClick ? 2.3 : 3.5,
          slidesToScroll: handleClick ? 1.3 : 2.5
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: handleClick ? 2.1 : 3.3,
          slidesToScroll: handleClick ? 1.1 : 2.3
        }
      }
    ]
  };
  if (labels) {
    const onChangeFilter = (filterBy, idx) => {
        if(handleClick) handleClick()
         navigate("/search", filterBy)
    }

    return (
      <section>
        {!handleClick && <h2>Where to?</h2>}
        <ul className="carousel-list">
          <Slider {...sliderSettings}>
            {localLabels.map((label, idx) => {
              return (
                <li
                  className={selectedCity === label.name ? 'selected' : ''}
                  key={label.name + `${idx}`}
                  onClick={() => onChangeFilter(label.filterBy, idx)}
                >
                  <LocationPreview label={label} />
                  <h4 className="text-center">{label.name}</h4>
                </li>
              );
            })}
          </Slider>
        </ul>

      </section>
    );
  }
}
