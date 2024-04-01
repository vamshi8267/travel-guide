import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import LocationContainer from '../LocationContainer'

class Home extends Component {
  state = {
    locationsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.apiUrlPackages()
  }

  apiUrlPackages = async () => {
    this.setState({
      isLoading: true,
    })
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(location => ({
        id: location.id,
        name: location.name,
        imageUrl: location.image_url,
        description: location.description,
      }))
      this.setState({
        locationsList: updatedData,
        isLoading: false,
      })
    }
  }

  renderLocationList = () => {
    const {locationsList} = this.state
    return (
      <ul className="location-list">
        {locationsList.map(location => (
          <LocationContainer key={location.id} locationData={location} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  redner() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <h1 className="travel-heading">Travel Guide</h1>
        <hr className="horizontal-line" />
        <div className="locations-container">
          {isLoading ? this.renderLoader() : this.renderLocationList()}
        </div>
      </div>
    )
  }
}

export default Home
