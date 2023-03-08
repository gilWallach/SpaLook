import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useNavigateSearch } from "../customHooks/useNavigateSearch";

import { setSelectedLabel } from "../store/actions/label.actions";
import { LabelPreview } from "./LabelPreview";

export function LabelCarousel({ labels, isCircleStyle, isGuestsList }) {
  const dispatch = useDispatch();
  const navigate = useNavigateSearch();
  const selectedLabel = useSelector((state) => state.spaModule.selectedLabel);

  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows:false,
    initialSlide: 0,
    slidesToShow: 10.5,
    slidesToScroll: 9.5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9.5,
          slidesToScroll: 8.5,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 9.3,
          slidesToScroll: 8.3,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 8.5,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 8.3,
          slidesToScroll: 7.3,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 7.5,
          slidesToScroll: 6.5,
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 7.2,
          slidesToScroll: 6.3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6.5,
          slidesToScroll: 5.5,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 6.3,
          slidesToScroll: 5.2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 4.5
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 3.3
        }
      }
    ]
  };

  if (labels) {
    async function onSelectLabel(label) {
      dispatch(setSelectedLabel(selectedLabel));
      navigate(`${label.url}`);
    }
    return (
      <ul className={isGuestsList ? "guests-list" : ""}>
        <Slider {...sliderSettings}>
          {labels.map((label) => {
            return (
              <li
                key={`carousel-${label._id}`}
                onClick={() => onSelectLabel(label)}
                className="label-preview"
              >
                <LabelPreview label={label} isCircleStyle={isCircleStyle} />
                <p>{label.name}</p>
              </li>
            );
          })}
        </Slider>
      </ul>
    );
  }
}
