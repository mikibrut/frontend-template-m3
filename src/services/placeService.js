import axios from "axios"

class PlaceService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/places`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  uploadImage = (file) => {
    return this.api.post('/upload', file)
      .then(res => res.data)
      .catch(err => console.error(err))
  };

  getPlaces() {
    return this.api.get('/').then(({ data }) => data);
  }

  getPlace(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }

  getPlacesByCreator(id) {
    return this.api.get(`/creator/${id}`).then(({ data }) => data);
  }

  createPlace(body) {
    return this.api.post('/create', body).then(({ data }) => data);
  }

  editPlace(id, body) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data);
  }

  deletePlace(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data);
  }



}

const placeService = new PlaceService();
export default placeService;