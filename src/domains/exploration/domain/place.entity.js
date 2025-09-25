/**
 * Place entity representing a touristic destination
 * Domain entity with business logic for place data
 *
 * @summary Place entity with validation and business rules
 * @author Anderson Ventosilla
 */

export class Place {
  /**
   * Creates a new Place instance
   * @param {Object} data - Place data object
   * @param {string} data.id - Unique identifier
   * @param {string} data.name - Place name
   * @param {string} data.category - Place category
   * @param {number} data.distance - Distance in meters
   * @param {string} data.infoUrl - Wikipedia URL for more information
   * @param {string} data.image - Image URL (optional)
   */
  constructor({ id, name, category, distance, infoUrl, image = null }) {
    this.id = id
    this.name = this.validateName(name)
    this.category = this.validateCategory(category)
    this.distance = this.validateDistance(distance)
    this.infoUrl = this.validateUrl(infoUrl)
    this.image = image
  }

  /**
   * Validates place name
   * @param {string} name - Place name to validate
   * @returns {string} Validated name
   * @throws {Error} If name is invalid
   */
  validateName(name) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Place name is required and must be a non-empty string')
    }
    return name.trim()
  }

  /**
   * Validates place category
   * @param {string} category - Category to validate
   * @returns {string} Validated category
   */
  validateCategory(category) {
    if (!category || typeof category !== 'string') {
      return 'tourism'
    }
    // Keep the original category as received from API
    return category.trim()
  }

  /**
   * Validates distance value
   * @param {number} distance - Distance to validate
   * @returns {number} Validated distance
   * @throws {Error} If distance is invalid
   */
  validateDistance(distance) {
    const numDistance = Number(distance)
    if (isNaN(numDistance) || numDistance < 0) {
      throw new Error('Distance must be a valid non-negative number')
    }
    return numDistance
  }

  /**
   * Validates URL format
   * @param {string} url - URL to validate
   * @returns {string} Validated URL
   * @throws {Error} If URL is invalid
   */
  validateUrl(url) {
    if (!url || typeof url !== 'string') {
      throw new Error('Info URL is required')
    }

    try {
      new URL(url)
      return url
    } catch {
      throw new Error('Invalid URL format')
    }
  }

  /**
   * Returns formatted distance for display
   * @returns {string} Formatted distance with unit
   */
  getFormattedDistance() {
    if (this.distance < 1000) {
      return `${Math.round(this.distance)} m`
    }
    return `${(this.distance / 1000).toFixed(1)} km`
  }

  /**
   * Gets display name for category
   * @returns {string} Category display name
   */
  getCategoryDisplay() {
    const categoryMap = {
      tourism: 'Tourism',
      natural: 'Natural',
      historic: 'Historic',
      cultural: 'Cultural',
      entertainment: 'Entertainment',
      sport: 'Sport',
      religion: 'Religion'
    }
    return categoryMap[this.category] || 'Tourism'
  }

  /**
   * Returns a plain object representation
   * @returns {Object} Plain object with place data
   */
  toObject() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      distance: this.distance,
      infoUrl: this.infoUrl,
      image: this.image
    }
  }

  /**
   * Checks if place has valid image URL
   * @returns {boolean} True if image URL exists and is valid
   */
  hasImage() {
    return Boolean(this.image && this.image.trim().length > 0)
  }
}