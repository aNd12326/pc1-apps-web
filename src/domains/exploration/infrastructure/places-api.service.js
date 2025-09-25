/**
 * Places API service for fetching touristic destination data
 * Infrastructure layer service using Axios for HTTP communication
 *
 * @summary API service for places data with error handling and response transformation
 * @author Anderson Ventosilla
 */

import axios from 'axios'
import { Place } from '../domain/place.entity.js'

/**
 * Places API service class
 * Handles communication with the places API endpoint
 */
export class PlacesApiService {
  /**
   * Creates a new PlacesApiService instance
   */
  constructor() {
    this.baseUrl = 'https://68d448d6214be68f8c68eb21.mockapi.io/api/v1'
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  /**
   * Sets up axios interceptors for request/response handling
   */
  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making API request to: ${config.url}`)
        return config
      },
      (error) => {
        console.error('API request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
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

  /**
   * Handles API errors and transforms them into user-friendly messages
   * @param {Error} error - The axios error object
   * @returns {Error} Transformed error with user-friendly message
   */
  handleApiError(error) {
    if (error.code === 'ECONNABORTED') {
      return new Error('Request timeout. Please check your internet connection.')
    }

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 404:
          return new Error('Places data not found.')
        case 500:
          return new Error('Server error. Please try again later.')
        case 503:
          return new Error('Service temporarily unavailable.')
        default:
          return new Error(`API error: ${status}`)
      }
    }

    if (error.request) {
      return new Error('Network error. Please check your internet connection.')
    }

    return error
  }

  /**
   * Fetches all places from the API
   * @returns {Promise<Place[]>} Array of Place entities
   * @throws {Error} If API request fails or data is invalid
   */
  async getAllPlaces() {
    try {
      const response = await this.client.get('/places')
      const placesData = response.data

      if (!Array.isArray(placesData)) {
        throw new Error('Invalid API response: expected array of places')
      }

      return placesData.map(placeData => this.transformToPlace(placeData))
    } catch (error) {
      console.error('Error fetching places:', error)
      throw error
    }
  }

  /**
   * Fetches places filtered by category
   * @param {string} category - Category to filter by
   * @returns {Promise<Place[]>} Array of filtered Place entities
   * @throws {Error} If API request fails or data is invalid
   */
  async getPlacesByCategory(category) {
    try {
      const allPlaces = await this.getAllPlaces()

      if (!category || category === 'all') {
        return allPlaces
      }

      return allPlaces.filter(place => place.category === category.toLowerCase())
    } catch (error) {
      console.error('Error fetching places by category:', error)
      throw error
    }
  }

  /**
   * Transforms raw API data to Place entity
   * @param {Object} placeData - Raw place data from API
   * @returns {Place} Place entity instance
   * @throws {Error} If place data is invalid
   */
  transformToPlace(placeData) {
    try {
      return new Place({
        id: placeData.id || placeData._id || Math.random().toString(36).substr(2, 9),
        name: placeData.name || 'Unknown Place',
        category: placeData.category || 'tourism',
        distance: placeData.distance || 0,
        infoUrl: placeData.infoUrl || placeData.info_url || 'https://wikipedia.org',
        image: placeData.image || placeData.imageUrl || null
      })
    } catch (error) {
      console.error('Error transforming place data:', placeData, error)
      // Return a default place instead of throwing to prevent breaking the entire list
      return new Place({
        id: Math.random().toString(36).substr(2, 9),
        name: 'Unknown Place',
        category: 'tourism',
        distance: 0,
        infoUrl: 'https://wikipedia.org',
        image: null
      })
    }
  }

  /**
   * Gets unique categories from all places
   * @returns {Promise<string[]>} Array of unique category names
   */
  async getCategories() {
    try {
      const places = await this.getAllPlaces()
      const categories = [...new Set(places.map(place => place.category))]
      return categories.sort()
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Return default categories if API fails
      return ['tourism', 'natural', 'historic', 'cultural', 'entertainment', 'sport', 'religion']
    }
  }
}