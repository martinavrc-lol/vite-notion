import { useNavigate } from "react-router-dom"
import { useRef } from "react"

export const Register = ()=>{

    const {VITE_EXPRESS} = import.meta.env
    const navigate = useNavigate()

    const userPost = useRef(null)

    let addUser = async (e) => {
        e.preventDefault()
        const { user, password } = userPost.current

        const newUser = {
            user: user.value,
            password: password.value,
        }

        let options = {
            method: `post`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        }

        let peticion = await fetch(`${VITE_EXPRESS}/users/register`, options)
        let datos = await peticion.json()
        console.log(datos)
        if(datos){
            navigate('/')
        }
    }

    return(
        <div className="Register">

            <h1>Resgister to start</h1>

            <form onSubmit={addUser} ref={userPost}>
                <input type="text" name="user" placeholder="Set user"/>
                <input type="password" name="password" placeholder="Set password"/>
                <input type="submit" value={"Register"}/>
            </form>

        </div>
    )
}