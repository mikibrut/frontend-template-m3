import axios from "axios"

class BandService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/bands`
    });

    this.api.interceptors.request.use(config => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
        return config;
      });
  }

  getBands() {
    return this.api.get('/').then(({ data }) => data);
  }

  getBand(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }

  createBand(body) {
    return this.api.post('/create', body).then(({ data }) => data);
  }

  editBand(id, body) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data);
  }

  deleteBand(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data);
  }



}

const bandService = new BandService();
export default bandService;