import axios from "axios"

class BandService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/bands`
    });
  }

  getBands() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getBand(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createBand(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editBand(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteBand(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }



}

const bandService = new BandService();
export default bandService;