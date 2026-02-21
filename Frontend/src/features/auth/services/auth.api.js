import axios from "axios";

export async function register(username, password, email) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      { username, email, password },
      { withCredentials: true },
    );
  } catch (err) {
    throw err;
  }
}

export async function login(username, password) {
    try{
        const response = await axios.post("http://localhost:3000/api/auth/login" , {username , password} , {withCredentials:true})
    }catch(err){
        throw err
    }
}
