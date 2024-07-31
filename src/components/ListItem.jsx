import { useState } from "react"

const ListItem = ( { id, todo, completed, deleteItem, editItem } ) => {

    const [done, setDone] = useState(completed);

    const handleClick = () => {
        setDone(prev => !prev);
    }

    return (
        <li className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <input onClick={handleClick} type="checkbox" checked={done} />
                <span className="text-white bg-black rounded-full px-2">{id}</span>
                {todo}
            </div>
            <div className="flex gap-2">
                <button onClick={()=>editItem(id)} className="text-white bg-green-500 hover:bg-blue-400 p-2 rounded-md w-fit">Edit</button>
                <button onClick={()=>deleteItem(id)} className="text-white bg-red-500 hover:bg-blue-400 p-2 rounded-md w-fit">Delete</button>
            </div>
        </li>
    )
}

export default ListItem
