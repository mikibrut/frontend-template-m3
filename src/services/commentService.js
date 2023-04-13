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

  createComment(advertId, body) {
    return this.api.post(`/${advertId}/create`, body).then(({ data }) => data);
  }
  
  editComment(advertId, commentId, body) {
    return this.api.put(`/${advertId}/edit/${commentId}`, body).then(({ data }) => data);
  }
  
  deleteComment(commentId) {
    return this.api.delete(`/${commentId}`).then(({ data }) => data);
  }


}

const commentService = new CommentService();
export default commentService;