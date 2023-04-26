import { Map, GoogleApiWrapper } from 'google-maps-react';


const MapContainer = (props) => {
    const mapStyles = {
      width: '100%',
      height: '100%',
      position: 'relative',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
    };
  
    return (
      <Map
        google={props.google}
        gestureHandling='cooperative'
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 34.0522, lng: -118.2437 }}
      />
    );
  };
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyD3DAfC8IgZUFsBIjWHh4CWPKyAp4cweOo'
  })(MapContainer);
  