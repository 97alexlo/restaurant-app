import React from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyAO57nQKkVLw9-RIHCb3BEWnGExhAckfEQ");

class GoogleMaps extends React.Component {
  state = {
    address: "Vancouver, BC, Canada",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    center: {
      lat: 49.2827291,
      lng: -123.1207375},
    height: "300px",
    mapPosition: {
      lat: 49.2827291,
      lng: -123.1207375,
    },
    markerPosition: {
      lat: 49.2827291,
      lng: -123.1207375,
    }
  };

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        },
          () => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(response => {
              console.log(response);
              const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray)
              this.setState({ // change states
                address: (address) ? address : "",
                area: (area) ? area : "",
                city: (city) ? city : "",
                state: (state) ? state : ""
              })
            }, error => {
              console.error(error);
            })
          })
        })
    }
    else {
      console.error("Geolocation is not supported by this browser");
    }
  }

  // get cities name
  getCity = (addressArray) => {
    let city = '';
    for(let i = 0; i < addressArray.length; i++) {
      if(addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  // get area name
  getArea = (addressArray) => {
    let area = '';
    for(let i = 0; i < addressArray.length; i++) {
      if(addressArray[i].types[0]) {
        for(let j = 0; j < addressArray.length; j++) {
          if('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  // get state's name
  getState = (addressArray) => {
    let state = '';
    for(let i = 0; i < addressArray.length; i++) {
      if(addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  };

  onMarkerDragEnd = (e) => {
    // get coordinates of red pin after dragging to a new location
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    // get address information of new location and store into state
    Geocode.fromLatLng(newLat, newLng).then(response => {
      console.log(response);
      const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray)

      this.setState({ // change states
        address: (address) ? address : "",
        area: (area) ? area : "",
        city: (city) ? city : "",
        state: (state) ? state : "",
        markerPosition: {
          lat: newLat,
          lng: newLng
        },
        mapPosition: {
          lat: newLat,
          lng: newLng
        }
      });
    });
  };

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
          addressArray = place.address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray),
          newLat = place.geometry.location.lat(),
          newLng = place.geometry.location.lng();

    this.setState({ // change states
        address: (address) ? address : "",
        area: (area) ? area : "",
        city: (city) ? city : "",
        state: (state) ? state : "",
        markerPosition: {
          lat: newLat,
          lng: newLng
        },
        mapPosition: {
          lat: newLat,
          lng: newLng
        },
      })
  };


  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={this.state.zoom}
        /* set position to newly dragged location coordinates stored in state */
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          /* set position to newly dragged location coordinates stored in state */
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
          <InfoWindow>
            <div>
              {this.state.address}
            </div>
          </InfoWindow>
        </Marker>
        <AutoComplete 
          className="form-control mt-1 mb-5" 
          placeholder="Enter a location and zoom in to find nearby restaurants (Ex. Washington D.C)"
          onPlaceSelected={this.onPlaceSelected}
          style={{width: "100%", marginBottom:"6rem"}}
          types={['(regions)']}

        >
        </AutoComplete>
      </GoogleMap>
    ));

    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAO57nQKkVLw9-RIHCb3BEWnGExhAckfEQ&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
  
}

export default GoogleMaps;