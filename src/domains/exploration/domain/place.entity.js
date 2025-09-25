export class Place {
  constructor({ id, name, category, distance, infoUrl, image = null }) {
    this.id = id
    this.name = name
    this.category = category
    this.distance = distance
    this.infoUrl = infoUrl
    this.image = image
  }
}
