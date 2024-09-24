import { FormEvent } from 'react';
import { Item } from '../types/item';
import { useMessages } from '../context/MessageContext';
import { useNavigate } from 'react-router-dom';

type Props = {
    item?: Item;
    setItem?: (item: Item) => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function ItemForm({ item, setItem }: Props) {
    const { addMessage } = useMessages();
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const url = item ? `${apiUrl}/items/${item.id}` : `${apiUrl}/items`;
        const method = item ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify({ name: formData.get('name') })
            });

            if (!response.ok) throw new Error('Request failed: ' + response.statusText);

            const data = await response.json();
            const message = item
                ? `Item ${item.name} updated to ${data.name}`
                : `Item ${data.name} created`
            addMessage(message);
            item && setItem
                ? setItem(data)
                : navigate(`/items/${data.id}`)
        } catch (error) {
            console.log(error);
            addMessage('Failed to update item');
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='text-2xl'>{item ? 'Edit item' : 'Create item'}</h2>
            <form onSubmit={onSubmit}>
                <label>Item name</label>
                <div className='flex gap-3'>
                    <input
                        type="text"
                        name='name'
                        placeholder='name'
                        className='border border-gray-300 rounded-lg p-2 w-1/4'
                        defaultValue={item?.name || ''}
                    />
                    <button type='submit' className='btn'>
                        {item ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>

    )
}