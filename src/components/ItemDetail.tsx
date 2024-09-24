import { useEffect, useRef, useState } from 'react';
import { Item } from '../types/item'
import { useParams } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';
import ItemForm from './ItemForm';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ItemDetail() {
    const [item, setItem] = useState<Item | null>(null);
    const params = useParams();
    const fetched = useRef(false);
    const { addMessage } = useMessages()

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/items/${params.id}`).then(res => {
                return res.json();
            }).then(data => {
                setItem(data);
                addMessage(`Item ${data.name} loaded`)
            })
            fetched.current = true;
        }
    }, [params.id, addMessage])

    if (!item) return null;

    return (
        <>
            <h2 className='text-2xl'>Details</h2>
            <div>
                <span className='font-bold'>ID:</span> {item.id}
            </div>
            <div className='space-x-2'>
                <span className='font-bold'>Name:</span>
                <span className='uppercase'>{item.name}</span>
            </div>
            <div className='flex flex-col gap-2 mt-3 border-t'>
               <ItemForm item={item} setItem={setItem} />
            </div>
        </>
    )
}