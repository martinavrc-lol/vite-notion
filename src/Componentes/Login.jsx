import { useRef } from "react"
import { useNavigate , NavLink } from "react-router-dom"
import "../CSS/Login.css"

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

            <h1 className="Login-h1">Log in to start</h1>

            <form className="Login-form" ref={formPost} onSubmit={loginPost}>
                <label className="Login-label">User<input className="Login-input" type="text" name="user" placeholder="Enter your user" /></label>
                <label className="Login-label">Password<input className="Login-input" type="password" name="password" placeholder="Enter your password" /></label>
                <input className="Login-submit" type="submit" value="Log in" />
            </form>

            <button className="Login-button"><NavLink to="/register">Register</NavLink></button>


        </div>
    )
}