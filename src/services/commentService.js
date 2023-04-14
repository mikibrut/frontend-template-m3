import axios from "axios"

class CommentService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/comments`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getCommentsByAdvert(advertId) {
    return this.api.get(`/${advertId}`).then(({ data }) => data);
  }

  deleteComment(commentId) {
    return this.api.delete(`/${commentId}`).then(({ data }) => data);
  }


}

const commentService = new CommentService();
export default commentService;