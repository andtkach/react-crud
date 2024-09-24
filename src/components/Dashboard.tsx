import { useEffect, useRef, useState } from 'react'
import { Item } from '../types/item'
import { Link } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Dashboard() {
    const [items, setItems] = useState<Item[]>([]);
    const {addMessage} = useMessages();

    const fetched = useRef(false);

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/items?_limit=4`).then(res => {
                return res.json();
            }).then(data => {
                setItems(data);
                addMessage('Top items loaded')
            })
            fetched.current = true;
        }
    }, [addMessage])


    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl'>Top Items</h2>
            <div className='flex gap-3'>
                {items.map(item => (
                    <Link key={item.id} to={`/items/${item.id}`}
                        className='p-4 bg-slate-700 text-white rounded-lg cursor-pointer'>
                        {item.name}
                    </Link>
                ))}
            </div>

        </div>
    )
}