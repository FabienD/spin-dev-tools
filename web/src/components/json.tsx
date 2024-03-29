'use client';

import React, { FC } from 'react';


const Json: FC = () => {

    const [action, setAction] = React.useState<string>();
    const [input, setInput] = React.useState<string>();
    const [result, setResult] = React.useState<string|null>();
    const [error, setError] = React.useState<string|null>();

    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setAction(event.target.value);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setInput(event.target.value);
    }

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError(null);
        setResult(null);

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
                    setResult(json_content.data);
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
                <form action="" onSubmit={handleSubmit} method="post">
                    <div>
                        <label htmlFor="action" className='block'>Action</label>
                        <select 
                            id="action" 
                            name="action" 
                            className='rounded focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400'
                            required
                            onChange={handleActionChange}
                            value={action} 
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
                            onChange={handleInputChange}
                            value={input}
                        />
                    </div>
                    <button type="submit" className='font-bold text-white bg-pink-500 hover:bg-pink-600 rounded p-3 my-5'>Process</button>
                </form>
            </div>
            {(error || result) &&
                <div className='sm:basis-1/2 bg-pink-100 p-3 sm:p-5  rounded overflow-y-auto shadow-md'>
                    {error && <p className='text-pink-600'>{error}</p>}
                    {result && <p className='text-purple-600'><pre>{result}</pre></p>}
                </div>
            }
        </div>
       </> 
     )
}

export default Json;