import * as React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Spin} from 'antd'
import {find} from '../../common/http/find'
import './visualSearch.css'

interface IVisualSearchProps {
    google: any;
}
interface IVisualSearchState {
  coords: {
    lat: number,
    lng: number
  } | null
}
class VisualSearch extends React.Component<IVisualSearchProps, IVisualSearchState> {
  state = {
    coords: null
  }

  public componentDidMount () {
    this.getLocation()
  }

  public setLocation = ({ coords }: { coords: {latitude: number, longitude: number}}) => {
    const newCoords = { lat: coords.latitude, lng: coords.longitude }
    find(newCoords, 1755000).then((resp: any) => {
      this.setState({ coords: newCoords})
      console.log(resp)
    })
  }

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
  }

  public render () {
    return this.state.coords === null ? <Spin /> :
        <div className="map-container">
        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={this.state.coords}
        />
      </div>
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(VisualSearch)