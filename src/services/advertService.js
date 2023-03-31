import axios from "axios"

class AdvertService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/adverts`
    });
  }

  getAdverts() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getAdvert(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createAdvert(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editAdvert(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteAdvert(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }



}

const advertService = new AdvertService();
export default advertService;