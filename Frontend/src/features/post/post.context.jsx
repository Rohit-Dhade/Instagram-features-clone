import { createContext , useState } from "react";

export const Postcontext = createContext()

export const PostContextProvider = ({children})=>{
    const [loading, setloading] = useState(false);
    const [feed, setfeed] = useState(null);
    const [post, setpost] = useState(null)

    return (
        <Postcontext.Provider value={{loading , setloading , feed , setfeed , post ,setpost}}>
            {children}
        </Postcontext.Provider>
    )
}

