import GoogleMapReact from 'google-map-react';
export function GoogleMap({ loc }) {
    const defaultProps = {
        center: {
            lat: loc.lat,
            lng: loc.lng,
        },
        zoom: 17
    };
    const MarkerCmp = ({ text }) => {
        return (
            <div >
                <span>{text}</span>
                <img src={require('../assets/imgs/marker.png')} alt="" style={{ height: '30px', width: '20px' }} />
            </div>
        )
    }
    return (
        <div className='map-container' style={{ width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCcob4qa4g-2l7otRU5g5-Av4lLiW90SOQ" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <MarkerCmp
                    lat={loc.lat}
                    lng={loc.lng}
                    text="Spa"
                />
            </GoogleMapReact>
        </div>
    )
}