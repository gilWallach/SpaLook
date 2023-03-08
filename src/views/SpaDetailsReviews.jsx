import { useState } from "react"
import { useOutletContext } from "react-router"
import { Icon } from "../cmps/Icon"
import { utilService } from "../services/util.service"

export function SpaDetailsReviews({spa,reviewAvg}) {
    // const [spa, reviewAvg] = useOutletContext()
    const stars = [1, 2, 3, 4, 5]
    const [shownReviews, setShownReviews] = useState(spa.reviews.length <= 5 ? spa.reviews : spa.reviews.slice(0, 5))

    function formatDate(ts) {
        const date = new Date(ts)
        return date.toLocaleString('he-IL', { year: "numeric", month: "numeric", day: "numeric" })
    }

    if (!spa) return
    return (
        <div className="spa-details-reviews">
            <div className="header-container flex space-between align-center">
                <div className="content-container">

                    <h2 className="bold">Reviews</h2>
                    <h3 className="flex">
                        <span>{spa.reviews.length} Reviews</span>
                        <span className="flex"><Icon name="Star"/> <span>{reviewAvg}</span></span>
                    </h3>
                </div>
                {/* <div className="img-container">
                    <img src={require('../assets/imgs/reviewsAssurance.png')} alt="" />
                </div> */}
            </div>
            <ul className="review-list">
                {shownReviews.map(review => {
                    return <li key={utilService.makeId()} className="flex column review-item">
                        <div className="review-heading flex align-center space-between">
                            <h3 className="bold">{review.by}</h3>
                            <span className="stars">
                                <ul className="flex">
                                    {stars.map(star => {
                                        return <li className={review.rate >= star ? 'filled' : ''} key={star}>
                                            <Icon name="Star"/>
                                        </li>
                                    })}
                                </ul>
                            </span>
                        </div>
                        <span className="date">{formatDate(review.createdAt)}</span>
                        <p>{review.description}</p>
                    </li>
                })}
            </ul>
            {spa.reviews.length > 5 && shownReviews.length <= 5 && <div className="btn-container flex">
                <button className="full-grow"
                    onClick={() => { setShownReviews(spa.reviews) }}>
                    Show All {spa.reviews.length} Reviews
                </button>
            </div>}
        </div>
    )
}