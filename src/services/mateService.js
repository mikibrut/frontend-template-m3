import axios from "axios"

class MateService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/mates`
    });
  }

  getMates() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getMate(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createMate(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editMate(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteMate(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }



}

const matesService = new MateService();
export default matesService;