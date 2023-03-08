import { useOutletContext } from "react-router"
import { Icon } from "../cmps/Icon"
import { utilService } from "../services/util.service"

export function SpaDetailsServices({spa}){
    // const [spa] = useOutletContext()

    const getGuestsSvg = (guests)=>{
        if(guests === 1) return <Icon name="Single"/>
        if(guests === 2) return <Icon name="Double"/>
        else return <Icon name="Group"/>
    }

    if(!spa) return
    return(
        <div className="spa-details-services" >
            <ul>
                {spa.packs.map(pack=>{
                    return <li key={utilService.makeId()} className="flex">
                        <div className="img-container">
                            <img src={pack.imgUrl} alt="" />
                        </div>
                        <div className="content-container flex column justify-center">
                        <h4>{pack.name}</h4>
                        <div className="pack-details flex">
                            <span>From <span className="semi-bold">${pack.price}</span> </span>
                            <span>{pack.duration} min</span>
                            <span>{getGuestsSvg(pack.guests)}</span>
                        </div>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}