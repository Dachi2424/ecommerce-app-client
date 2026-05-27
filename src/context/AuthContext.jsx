import { createContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext(null)

function AuthProvider({children}){

  const [loggedin, setLoggedin] = useState(null)
  // I dont have admin logic yet

  useEffect(() => {
    async function isLoggedIn(){
      try{
        const res = await axios.get("http://localhost:3001/auth", {withCredentials: true})
        setLoggedin(res.data)
        console.log(res.data)
      } catch(err){
        console.log(err)
      }
    }
    isLoggedIn()
  }, [])

  async function refreshAuth(){
    try{
      const res = await axios.get("http://localhost:3001/auth", {withCredentials: true})
      console.log(res);
      setLoggedin(res.data)
    } catch(err){
      console.log(err)
    }
  }

  return(
    <AuthContext.Provider value={{setLoggedin, loggedin, refreshAuth}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;
export {AuthContext}