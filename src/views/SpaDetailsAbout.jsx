import { useEffect, useRef, useState } from "react";
import { json, useOutletContext } from "react-router";
import { FacilitiesList } from "../cmps/FacilitiesList";
import { GoogleMap } from "../cmps/GoogleMap";
import { Icon } from "../cmps/Icon";

export function SpaDetailsAbout({ spa }) {
  // const [spa] = useOutletContext()
  // const [isLongText, setIsLongText] = useState(spa.description.length < 100 ? false : true)
  const [isLongText, setIsLongText] = useState(true);
  const elDesc = useRef();

  useEffect(() => {
    const { scrollHeight, offsetHeight } = elDesc.current;
    scrollHeight > offsetHeight ? setIsLongText(true) : setIsLongText(false);
  }, []);

  if (!spa) return;
  return (
    <div className="spa-details-about">
      <div className="description">
        <h2>About</h2>
        {/* {isLongText
                    ? <div className="long-text">
                        <p>{spa.description.substring(0,100) + '...'} <button onClick={() => setIsLongText(false)}>Read More</button></p>
                    </div>
                    : <p>{spa.description}</p>} */}
        <div className="text-container">
          <p ref={elDesc} className={`${isLongText ? "crop" : ""}`}>
            {spa.description}
          </p>
          <button
            className={isLongText ? "" : "hidden"}
            onClick={() => setIsLongText(false)}
          >
            Read More
          </button>
        </div>
      </div>
      <div className="facilities">
        <h2>Facilities</h2>
                    <FacilitiesList facilities={spa.facilities} id={spa._id}/>
      </div>
      <div className="opening-hours">
        <h2>Opening Hours</h2>
        <ul>
          {Object.keys(spa.activityHours).map((day) => {
            return (
              <li key={Math.random()} className="flex space-between">
                <span>{day} </span>
                <div className="hours">
                  <span>{spa.activityHours[day].from} - </span>
                  <span>{spa.activityHours[day].to}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="contact">
        <h2>Contact</h2>
        <div className="flex">
          <Icon name="Phone" />
          <a href={`tel: +972${spa.phone}`}>{spa.phone}</a>
        </div>
        {spa.webUrl && (
          <div className="flex">
            <Icon name="WorldThick" />{" "}
            <a href={`https://${spa.webUrl}`} target="_blank">
              {spa.webUrl}
            </a>
          </div>
        )}
      </div>
      <div className="map">
        <div className="heading-container flex space-between">
          <h2>Map</h2>
          <p>
            {spa.location.street}, {spa.location.city}
          </p>
        </div>
        <GoogleMap loc={{ lat: spa.location.lat, lng: spa.location.lng }} />
      </div>
    </div>
  );
}
