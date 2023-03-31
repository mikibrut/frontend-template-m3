import axios from "axios"

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`
    });
  }

  getProfile(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  editProfile(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

//   deleteMate(id) {
//     return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
//   }



}

const profileService = new ProfileService();
export default profileService;