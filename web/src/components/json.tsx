'use client';

import React, { FC } from 'react';


const Json: FC = () => {

    const [json, setJson] = React.useState<string|null>();
    const [error, setError] = React.useState<string|null>();

    const handleJson = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const action = formData.get('action');
        const input = formData.get('input');
        setError(null);
        setJson(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/json`, {
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
                    setJson(json_content.data);
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
                <h2 className='font-bold text-xl sm:text-2xl mb-4 text-pink-500'>Json prettyfier & minifier</h2>
                <form action="" onSubmit={handleJson} method="post">
                    <div>
                        <label htmlFor="action" className='block'>Action</label>
                        <select 
                            id="action" 
                            name="action" 
                            className='rounded focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400'
                            required 
                        >
                            <option value="">-- choose an action --</option>
                            <option value="prettify">Prettify</option>
                            <option value="minify">Minify</option>
                        </select>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="input" className='block'>The string to apply action</label>
                        <textarea 
                            id="input" 
                            name="input"
                            rows={10}
                            maxLength={4096}
                            className='w-full rounded focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400' 
                            required 
                        />
                    </div>
                    <button type="submit" className='font-bold text-white bg-pink-500 hover:bg-pink-600 rounded p-3 my-5'>Process</button>
                </form>
            </div>
            {(error || json) &&
                <div className='sm:basis-1/2 bg-pink-100 p-3 sm:p-5  rounded overflow-y-auto shadow-md'>
                    {error && <p className='text-pink-600'>{error}</p>}
                    {json && <p className='text-purple-600'><pre>{json}</pre></p>}
                </div>
            }
        </div>
       </> 
     )
}

export default Json;