import { useRef } from "react"
import { useNavigate , NavLink } from "react-router-dom"

export const Login = () => {

    const navigate = useNavigate()
    const { VITE_EXPRESS } = import.meta.env

    const formPost = useRef(null)

    const loginPost = async (e) => {
        e.preventDefault()

        const { user, password } = formPost.current

        const find = {
            user: user.value,
            password: password.value
        }

        const options = {
            method: `post`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(find)

        }
        const peticion = await fetch (`${VITE_EXPRESS}/users/login`, options)
        const datos = await peticion.json()
        console.log(datos)
        if(datos){
            navigate('/notes')
        }
    }

    return (
        <div className="Login">

            <h1>Log in to start</h1>

            <form ref={formPost} onSubmit={loginPost}>
                <input type="text" name="user" placeholder="User" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>

            <button><NavLink to="/register">Register</NavLink></button>


        </div>
    )
}