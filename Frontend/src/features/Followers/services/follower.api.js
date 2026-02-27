import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function following(){
    const response = await api.get('/api/user/following');
    return response.data.Alldata;
}


export async function follower(){
    const response = await api.get('/api/user/follower');
    return response.data.Alldata;
}

export async function OtherUsers(){
    const response = await api.get('/api/user/allUsers');
    return response.data.allUsers
}

export async function FollowUser(username){
    const response = await api.post('/api/user/follow/'+username);
    return response.data
}