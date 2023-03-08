import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import { StarSvg } from "./svgs/StarSvg";

export function SpaPreview({ spa, isModal, isAdmin }) {
  const navigate = useNavigate();
  const params = useParams();
  let urlLocation = useLocation();

  const { name, location, imgUrls, reviews } = spa;
  const [reviewAvg, setReviewAvg] = useState(null);
  const [minPrice, setMinPrice] = useState(null);

  useEffect(() => {
    calcReviewAvg();
    calcMinPrice();
  }, []);
  // }, [spa]);

  function handleClick() {
    navigate(`/spa/${spa._id}`);
  }

  function calcReviewAvg() {
    if (!spa.reviews.length) return "New Spa";
    const sum = spa.reviews?.reduce((acc, review) => acc + review.rate, 0);
    const avg = (sum / spa.reviews.length).toFixed(2);
    setReviewAvg(avg);
  }

  function calcMinPrice() {
    if (!spa.packs && !spa.packs.length) return null;
    const reduceMinPrice = spa.packs?.reduce((acc, pack) => {
      return acc < pack.price ? acc : pack?.price;
      // return acc < pack.price ? acc : pack?.price.toFixed(2);
    }, Infinity);
    setMinPrice(reduceMinPrice);
  }
  return (
    <li
      onClick={handleClick}
      className={
        urlLocation.pathname === "/" || isModal
          ? `spa-preview-container`
          : `spa-card flex align-center`
      }
    >
      <div className="img-container square-ratio">
        <img src={imgUrls[0]} alt="spa image" />
        {!isModal && reviewAvg &&(
          <div className="rating flex align-center">
            <StarSvg/>
            <span>{reviewAvg}</span>
          </div>
        )}
      </div>
      <div className="preview-content flex column justify-center">
        <h3>{name}</h3>
        {!isModal && (
          <>
            <div className="flex space-between city-rating-container">
              <p>{location.city}</p>
              {urlLocation.pathname !== "/" && reviewAvg && (
                <div className="rating flex align-center">
                  <StarSvg/>
                  <span>{reviewAvg}</span>
                </div>
              )}
            </div>

            {minPrice && (
              <h4>
                From
                <span className="bold">
                  {minPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </h4>
            )}
          </>
        )}
      </div>
      {isAdmin && <div className="actions">
      <button className="simple-button" onClick={(ev) => {
        ev.stopPropagation()
        navigate(`/admin/edit/${spa._id}`)
      }}>Edit Spa</button>
        </div>}
    </li>
  );
}
