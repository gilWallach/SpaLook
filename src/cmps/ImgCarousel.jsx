import Slider from "react-slick"

export function ImgCarousel({imgUrls}){
    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows:false,
        // fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    }
    return(
        <Slider {...sliderSettings} >
        {imgUrls.map(imgUrl=>{
            return <img src={imgUrl} alt="" key={Math.random()} />
        })}
    </Slider>
    )
}