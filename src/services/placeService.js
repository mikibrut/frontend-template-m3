import axios from "axios"

class PlaceService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/places`
    });
  }

  getPlaces() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getPlace(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createPlace(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editPlace(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deletePlace(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }



}

const placeService = new PlaceService();
export default placeService;