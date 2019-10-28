import * as React from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {Spin} from 'antd'
import {find} from '../../common/http/find'
import './visualSearch.css'
import { getDisplay } from '../../common/http/display';
import { getStatistics } from '../../common/http/statistics';

interface IVisualSearchProps {
    google: any;
}
interface IVisualSearchState {
  coords: {
    lat: number,
    lng: number
  } | null
  markers: IMarker[]
  activeMarker: IMarker | null;
  selectedPlace: React.ReactNode;
  showInfoWindow: boolean;
  markerData: object;
}
interface IMarker {
  // lat, lng
  coordinates: number[]
  propertyId: string
}
class VisualSearch extends React.Component<IVisualSearchProps, IVisualSearchState> {
  state = {
    coords: null,
    markers: [],
    activeMarker: null,
    selectedPlace: '',
    markerData: {},
    showInfoWindow: false
  }

  public componentDidMount () {
    this.getLocation()
  }

  public setLocation = ({ coords }: { coords: {latitude: number, longitude: number}}) => {
    const newCoords = { lat: coords.latitude, lng: coords.longitude }
    find(newCoords, 175500000).then((resp: IMarker[]) => {
      // resp.forEach((poi: IMarker) => {
      //   getDisplay(poi.propertyId).then((resp: any) => {
      //     console.log(resp)
      //   })
      // })
      this.setState({
        coords: newCoords,
        markers: resp
      })
    })
  }

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
  }

  public onMarkerClick = (props: any, marker: IMarker, e: Event) => {
    console.log(props)
    console.log(marker)
    const getPropertyIdFromLngLat = (lng: number, lat:number) =>
      this.state.markers.filter(({coordinates}: IMarker) => coordinates[0] === lng && coordinates[1] === lat)[0] || { propertyId: ''}
    const currentMarker = getPropertyIdFromLngLat(props.position.lng, props.position.lat) as IMarker
    getStatistics(currentMarker.propertyId, 10000).then((resp: any) => {  
      console.log(resp)
      this.setState({
        selectedPlace: this.renderCurrentInfo(currentMarker, resp),
        activeMarker: marker,
        showInfoWindow: true
      });
    })
    
  }

  public renderCurrentInfo = (currentMarker: IMarker, propertyInfo: any) => {
    const info = Object.keys(propertyInfo).map((featureKey: string) => {
      if (featureKey === 'buldingDistances') {
        return <li>{featureKey}: {propertyInfo[featureKey].join(', ')}</li>
      }
      return <li>{featureKey}: {propertyInfo[featureKey]}</li>
    })
    return <div>
      <ul>
        {info}
      </ul>
      <img src={`/display/${currentMarker.propertyId}`} width="250px" height="250px" />
    </div>
  }
    
  
  public onMapClicked = (props: any) => {
      if (this.state.showInfoWindow) {
        this.setState({
          showInfoWindow: false,
          activeMarker: null
        })
      }
    };

  public renderMarkers = () => {
    return this.state.markers.map(({coordinates, propertyId}: IMarker) => {
      return <Marker
        onClick={this.onMarkerClick}
        name={propertyId}
        position={{ lng: coordinates[0], lat: coordinates[1] }}
        key={propertyId}
      />
    })
  }

  public renderInfo = () => {
    const activeMarker = this.state.activeMarker as unknown as IMarker
    if (activeMarker) {
      return <image
        href={`/display/${activeMarker.propertyId || ''}?overlay=yes&building=green&parcel=orange`}
      />
    } else {
      return false
    }
  }

  public render () {
    return this.state.coords === null ? <Spin /> :
        <div className="map-container">
        <Map
          onClick={this.onMapClicked}
          google={this.props.google}
          zoom={3}
          initialCenter={this.state.coords}
        >
          {this.renderMarkers()}
          <InfoWindow

            marker={this.state.activeMarker}
            visible={this.state.showInfoWindow}
          >
            <div>
              <h1>Property Information</h1>
              {this.state.selectedPlace}
            </div>
          </InfoWindow>
        </Map>
      </div>
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(VisualSearch)