import axios from "axios"

class MateService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/mates`
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

  getMates() {
    return this.api.get('/').then(({ data }) => data);
  }

  getMate(id) {
    return this.api.get(`/${id}`).then(({ data }) => data);
  }

  getMatesByCreator(id) {
    return this.api.get(`/creator/${id}`).then(({ data }) => data);
  }

  createMate(body) {
    return this.api.post('/create', body).then(({ data }) => data);
  }

  editMate(id, body) {
    return this.api.put(`/edit/${id}`, body).then(({ data }) => data);
  }

  deleteMate(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data);
  }



}

const mateService = new MateService();
export default mateService;