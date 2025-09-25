
import axios from 'axios'
import { Place } from '../domain/place.entity.js'

export class PlacesApiService {

  constructor() {
    this.baseUrl = 'https://68d448d6214be68f8c68eb21.mockapi.io/api/v1'
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setup()
  }

  /**
   axioss
   */
  setup() {
    this.client.interceptors.request.use(
      (config) => {
        console.log(`${config.url}`)
        return config
      },
      (error) => {
        console.error('API request error:', error)
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      (response) => {
        console.log(`API response received from: ${response.config.url}`)
        return response
      },
      (error) => {
        console.error('API response error:', error)
        return Promise.reject(this.handleApiError(error))
      }
    )
  }

  async getAllPlaces() {
    const response = await this.client.get('/places')
    const placesData = response.data

    return placesData.map(placeData => this.transformToPlace(placeData))
  }



  transformToPlace(placeData) {
    return new Place({
      id: placeData.id || placeData._id || Math.random().toString(36).substr(2, 9),
      name: placeData.name || 'Unknown Place',
      category: placeData.category || 'tourism',
      distance: placeData.distance || 0,
      infoUrl: placeData.infoUrl || placeData.info_url || 'https://wikipedia.org',
      image: placeData.image || null
    })
  }

}
