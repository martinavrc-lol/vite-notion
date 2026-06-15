import { useNavigate , NavLink } from "react-router-dom"
import '../CSS/Header.css'

export const Header = ()=>{

    const navigate = useNavigate()

    let logOut = ()=>{
        navigate('/')
    }

    return(
        <div className="Header">
            <img className="Header-icon" src="/notion-icon.webp" alt="Notion-icon" />

            <nav className="Header-nav">
                <ul className="Header-ul">
                    <li className="Header-li"><NavLink to="/">Home</NavLink></li>
                    <li className="Header-li"><NavLink to="/notes">Notes</NavLink></li>
                    <li className="Header-li"><NavLink to="/register">Register</NavLink></li>
                </ul>
            </nav>

            <button onClick={logOut} className="Header-button">Log Out</button>
        </div>
    )
}