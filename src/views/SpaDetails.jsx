import { useEffect, useState, Linking, useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { spaService } from "../services/spa.service";
import { ImgCarousel } from "../cmps/ImgCarousel";
import { ShareModal } from "../cmps/ShareModal";
import { Screen } from "../cmps/Screen";
import { Icon } from "../cmps/Icon";
import { SpaDetailsServices } from "./SpaDetailsServices";
import { SpaDetailsAbout } from "./SpaDetailsAbout";
import { SpaDetailsReviews } from "./SpaDetailsReviews";
import { Skeleton } from "@mui/material";
import { HomepageSkeleton } from "../cmps/HomepageSkeleton";
import { CardSkeleton } from "../cmps/CardSkeleton";

export function SpaDetails() {
  const [spa, setSpa] = useState();
  const [reviewAvg, setReviewAvg] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesIntersecting, setIsServicesIntersecting] = useState(false);
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false);
  const [isReviewsIntersecting, setIsReviewsIntersecting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);

  const servicesOptions = {
    root: null,
    rootMargin: "-50px",
    threshold: 0,
  };
  const [servicesObserver] = useState(
    new IntersectionObserver(handleIntersection, servicesOptions)
  );

  useEffect(() => {
    loadSpa();
  }, [params]);

  useEffectUpdate(() => {
    calcReviewAvg();
  }, [spa]);

  useEffectUpdate(() => {
    servicesObserver.observe(servicesRef.current);
    servicesObserver.observe(aboutRef.current);
    servicesObserver.observe(reviewsRef.current);
  }, [servicesRef.current]);

  async function loadSpa() {
    const spaId = params.id;
    const spa = await spaService.getById(spaId);
    setSpa(spa);
  }

  function calcReviewAvg() {
    if (!spa.reviews.length) return "New Spa";
    const sum = spa.reviews.reduce((acc, review) => acc + review.rate, 0);
    const avg = (sum / spa.reviews.length).toFixed(2);
    setReviewAvg(avg);
  }

  function handleScroll(ev, ref) {
    ev.preventDefault();
    window.scrollTo({ top: ref.current.offsetTop - 20, behavior: "smooth" });
  }

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.target.className === "services")
        return entry.isIntersecting
          ? setIsServicesIntersecting(true)
          : setIsServicesIntersecting(false);
      if (entry.target.className === "about")
        return entry.isIntersecting
          ? setIsAboutIntersecting(true)
          : setIsAboutIntersecting(false);
      if (entry.target.className === "reviews")
        return entry.isIntersecting
          ? setIsReviewsIntersecting(true)
          : setIsReviewsIntersecting(false);
    });
  }

  if (!spa)
    return (
      <div>
        <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
      </div>
    );
  return (
    <section className={`spa-details full main-layout `}>
      <div className="spa-header full main-layout">
        <div className="main-content-container flex column">
          <div className="buttons-container flex space-between ">
            <div className="back-button">
              <div className="back-button">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="rounded-button"
                >
                  <Icon name="LeftArrow" />
                </button>
              </div>
            </div>
            <div className="contact-buttons flex ">
              <a className="rounded-button" href="tel: +972526548956">
                <button className="rounded-button">
                  <Icon name="Phone" />
                </button>
              </a>
              <a
                href={`https://wa.me/${spa.phone}?text=Hello! I want to order a spa treatment `}
                target="_blank"
              >
                <button className="rounded-button">
                  <img
                    src={require("../assets/imgs/whatsapp.png")}
                    alt="whatsApp"
                  />
                </button>
              </a>
            </div>
          </div>
          <div className="info flex space-between">
            <div className="spa-info">
              <h1>{spa.name}</h1>
              <h4>
                {spa.location.street}, {spa.location.city}
              </h4>
            </div>
            <div className="content-container flex column">
              <div className="rating flex auto-center">
                <span className="semi-bold">{reviewAvg}</span>
                <Icon name="Star" />
              </div>
              <div className="buttons flex">
                <button
                  className="rounded-button"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Icon name="Share" />{" "}
                </button>
                {/* <button className="rounded-button">
                  <Icon name="Heart" />{" "}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="details-nav full ">
        <ul className="flex">
          <li className="full-grow">
            <a
              className={isServicesIntersecting ? "active" : ""}
              onClick={(ev) => handleScroll(ev, servicesRef)}
            >
              Services
            </a>
          </li>
          <li className="full-grow">
            <a
              className={
                isAboutIntersecting && !isServicesIntersecting ? "active" : ""
              }
              onClick={(ev) => handleScroll(ev, aboutRef)}
            >
              About
            </a>
          </li>
          <li className="full-grow">
            <a
              className={
                isReviewsIntersecting &&
                !isAboutIntersecting &&
                !isServicesIntersecting
                  ? "active"
                  : ""
              }
              onClick={(ev) => handleScroll(ev, reviewsRef)}
            >
              Reviews
            </a>
          </li>
        </ul>
        {/* <ul className="flex">
          <li className="full-grow">
            <NavLink to={`/spa/${spa._id}`} end replace>
              Services
            </NavLink>
          </li>
          <li className="full-grow">
            <NavLink to={`/spa/${spa._id}/about`} replace>
              About
            </NavLink>
          </li>
          <li className="full-grow">
            <NavLink to={`/spa/${spa._id}/reviews`} replace>
              Reviews
            </NavLink>
          </li>
        </ul> */}
      </nav>
      <div className="carousel-container full">
        <ImgCarousel imgUrls={spa.imgUrls} />
      </div>
      <ShareModal
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        shareUrl={spa.webUrl}
      />
      <Screen isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* <Outlet context={[spa, reviewAvg]} /> */}

      <div className="services" ref={servicesRef}>
        <SpaDetailsServices spa={spa} />
      </div>
      <div className="about" ref={aboutRef}>
        <SpaDetailsAbout spa={spa} />
      </div>
      <div className="reviews" ref={reviewsRef}>
        <SpaDetailsReviews spa={spa} reviewAvg={reviewAvg} />
      </div>
    </section>
  );
}
