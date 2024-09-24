import { useState, useRef, useEffect } from 'react';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ItemsList() {
    const [items, setItems] = useState<Item[]>([]);
    const fetched = useRef(false);
    const { addMessage } = useMessages();

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/items`).then(res => {
                return res.json();
            }).then(data => {
                setItems(data);
                addMessage('Items loaded')
            })
            fetched.current = true;
        }
    }, [addMessage]);

    async function deleteItem(item: Item) {
        try {
            const response = await fetch(`${apiUrl}/items/${item.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Request failed: ' + response.statusText);

            setItems(prevItems => prevItems.filter(h => h.id !== item.id));
            addMessage(`Item ${item.name} deleted`);
        } catch (error) {
            console.log(error);
            addMessage('Failed to delete item');
        }
    }

    return (
        <>
            <div className='flex gap-3'>
                <h2 className='text-2xl'>My items</h2>
                <Link to='/items/create' className='btn'>Create new</Link>
            </div>

            <ul className='flex flex-col gap-2 my-3'>
                {items.map(item => (
                    <Link to={`/items/${item.id}`} key={item.id} className='flex cursor-pointer'>
                        <span className='bg-slate-700 text-white rounded-l p-2'>{item.id}</span>

                        <div  className='p-2 bg-slate-300 rounded-r w-full flex justify-between'>
                            <span>{item.name}</span>
                            <span
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteItem(item);
                                }}
                                className='bg-white px-1 cursor-pointer'>
                                X
                            </span>
                        </div>

                    </Link>
                ))}
            </ul>
        </>
    )
}