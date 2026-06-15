import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Header } from './Header'
import '../CSS/Notes.css'

const NotesContext = createContext()

export const Notes = () => {

    const [notes, setNotes] = useState([])

    const { VITE_EXPRESS } = import.meta.env

    const notesPost = useRef(null)
    const notesEdit = useRef(null)

    let getNotes = async () => {

        let options = {
            method: `get`
        }

        let peticion = await fetch(`${VITE_EXPRESS}/notes`, options)
        let datos = await peticion.json()
        console.log(datos)
        setNotes(datos.data)
    }

    let addNotes = async (e) => {
        e.preventDefault()

        const { title, content, favorite } = notesPost.current

        const newNote = {
            title: title.value,
            content: content.value,
            favorite: favorite.checked
        }

        let options = {
            method: `post`,
            headers: {
                "Content-types": "application/json"
            },
            body: JSON.stringify(newNote)
        }

        let peticion = await fetch(`${VITE_EXPRESS}/notes`, options)
        let datos = await peticion.json()
        setNotes(datos.data)

    }

    let editNotes = async (e) => {
        e.preventDefault()

        const { _id, title, content, favorite } = notesEdit.current

        const edit = {
            _id: _id.value,
            title: title.value,
            content: content.value,
            favorite: favorite.checked
        }

        let options = {
            method: `put`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(edit)
        }

        let peticion = await fetch(`${VITE_EXPRESS}/notes/id/${_id.value}`, options)
        let datos = await peticion.json()
        console.log(datos)
        setNotes(datos.data)
    }

    let updateNotes = async (_id) => {

        console.log(`Updating note`)

        const note = notes.find(note => note._id === _id)
        const { _id: id, title, content, favorite } = note

        notesEdit.current._id.value = id
        notesEdit.current.title.value = title
        notesEdit.current.content.value = content
        notesEdit.current.favorite.value = favorite

    }

    let deleteNotes = async (_id) => {
        console.log(`Note deleted`)

        let options = {
            method: `delete`
        }

        let peticion = await fetch(`${VITE_EXPRESS}/notes/id/${_id}`, options)
        let datos = await peticion.json()
        console.log(datos)
        setNotes(datos.data)
    }

    useEffect(() => {
        getNotes()
    }, [])



    return (

        <NotesContext.Provider value={{ editNotes, updateNotes, deleteNotes, addNotes }}>

            <div className="Notes">

                 <Header />

                <div className="Notes-main">
                    <h1 className='Notes-h1'>Note list</h1>

                    <h2 className='Notes-h2'>Add Note</h2>
                    <form className='Notes-add' onSubmit={addNotes} ref={notesPost}>
                        <input className='Notes-input' type="text" name='title' placeholder='Add Title' />
                        <input className='Notes-input' type="text" name='content' placeholder='Add Content' />
                        <input className='Notes-input' type="checkbox" name='favorite' placeholder='Favorite' />
                        <input className='Notes-input' type="submit" value="Add Note" />
                    </form>

                    <ul>
                        {notes.map(note =>
                            <Note key={note._id} {...note} />
                        )}
                    </ul>

                    <h2 className='Notes-h2'>Edit Note</h2>
                    <form className='Notes-edit' onSubmit={editNotes} ref={notesEdit}>
                        <input className='Notes-input' type="text" name='_id' placeholder='ID' />
                        <input className='Notes-input' type="text" name='title' placeholder='Edit Title' />
                        <input className='Notes-input' type="text" name='content' placeholder='Edit Content' />
                        <input className='Notes-input' type="checkbox" name='favorite' placeholder='Favorite' />
                        <input className='Notes-input' type="submit" value="Update Note" />
                    </form>
                </div>


            </div>

        </NotesContext.Provider>
    )
}

const Note = (props) => {

    const { updateNotes, deleteNotes } = useContext(NotesContext)

    const { _id, title, favorite, content } = props

    return (
        <div className="Notes-list">

            <article>
                <h2>{title}</h2>
                <p>{content}</p>
                {favorite ? 'Favorite' : ''}
            </article>
            <button onClick={() => deleteNotes(_id)}>Delete note</button>
            <button onClick={() => updateNotes(_id)}>Edit note</button>

        </div>

    )
}
