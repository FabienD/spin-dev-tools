'use client';

import React, { FC } from 'react';


const Url: FC = () => {

    const [url, setUrl] = React.useState<string|null>();
    const [error, setError] = React.useState<string|null>();

    const handleUrl = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const action = formData.get('action');
        const input = formData.get('input');
        setError(null);
        setUrl(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action,
                input
            }),
        }).then((response) => {
            
            if (response.status === 200) {
                let json = response.json();
                json.then((json_content) => {
                    setUrl(json_content.data);
                });
            } else {
                setError('An error occurred. Please try again later.')
            }
        });
    }

    return (
        <>
        <div className='sm:flex sm:space-x-4 my-5'>
            <div className='sm:basis-1/2 bg-gray-100 p-3 sm:p-5 rounded shadow-md'>
                <h2 className='font-bold text-xl sm:text-2xl mb-4 text-purple-500'>URL encode & decode</h2>
                <form action="" onSubmit={handleUrl} method="post">
                    <div>
                        <label htmlFor="action" className='block'>Action</label>
                        <select 
                            id="action" 
                            name="action" 
                            className='rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                            required 
                        >
                            <option value="">-- choose an action --</option>
                            <option value="encode">Encode</option>
                            <option value="decode">Decode</option>
                        </select>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="input" className='block'>The string to apply action</label>
                        <textarea 
                            id="input" 
                            name="input"
                            rows={2}
                            maxLength={255}
                            className='w-full rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400' 
                            required 
                        />
                    </div>
                    <button type="submit" className='font-bold text-white bg-purple-500 hover:bg-purple-600 rounded p-3 my-5'>Process</button>
                </form>
            </div>
            {(error || url) &&
                <div className='sm:basis-1/2 bg-indigo-100 p-3 sm:p-5  rounded overflow-y-auto shadow-md'>
                    {error && <p className='text-pink-900'>{error}</p>}
                    {url && <p className='text-purple-900'>{url}</p>}
                </div>
            }
        </div>
       </> 
     )
}

export default Url;