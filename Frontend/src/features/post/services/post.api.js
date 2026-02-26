import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getfeed() {
    const response = await api.get('/api/post/feed');  
    return response.data.posts;
}

export async function CreatePost(imageFile , caption){
    const formdata = new FormData();

    formdata.append('image' , imageFile);
    formdata.append('caption' , caption)

    const response = await api.post('/api/post/' , formdata);

    return response.data; 
}


export async function likePost(postId){
    const response = await api.post('/api/post/like/'+postId)
    return response.data;
}

export async function UnlikePost(postId){
    const response = await api.post('/api/post/unlike/'+postId)
    return response.data;
}
