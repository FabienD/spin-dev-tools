'use client';

import React, { FC } from 'react';
import UuidList from './uuidList';


const Uuid: FC = () => {

    const [action, setAction] = React.useState<string>("7");
    const [input, setInput] = React.useState<number>(4);
    const [result, setResult] = React.useState<[]|null>();
    const [error, setError] = React.useState<string|null>();

    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setAction(event.target.value);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(parseInt(event.target.value));
    }

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError(null);
        setResult(null);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/uuid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'version': parseInt(action),
                'sample_to_generate': input
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
        <div className='sm:flex sm:space-x-4 lg:h-40 lg:max-h-40 my-5'>
            <div className='sm:basis-1/2 bg-gray-100  p-3 sm:p-5 rounded shadow-md'>
                <h2 className='font-bold text-xl sm:text-2xl mb-4 text-sky-500'>Uuid generator</h2>
                <form action="" method="post" onSubmit={handleSubmit} className='lg:flex lg:space-x-2'>
                    <div className='lg:basis-1/2'>
                        <label htmlFor="version" className='block'>Version</label>
                        <select 
                            id="version" 
                            name="version" 
                            className='rounded focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                            onChange={handleActionChange}
                            required
                            value={action}
                        >
                            <option value="4">Version 4 (Random)</option>
                            <option value="5">Version 5 (Sha1)</option>
                            <option value="7">Version 7 (SortRand)</option>
                        </select>
                    </div>
                    <div className='lg:basis-1/2'>
                        <label htmlFor="sample_to_generate" className='block'>Number to generate</label>
                        <input 
                            type="text" 
                            id="sample_to_generate" 
                            name="sample_to_generate" 
                            maxLength={2} 
                            required 
                            className='rounded focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400' 
                            onChange={handleInputChange}
                            value={input}
                        />
                    </div>
                    <button type="submit" className='font-bold text-white bg-sky-500 hover:bg-sky-600 rounded p-3 my-5'>Generate</button>
                </form>
            </div>
            {(error || result) &&
                <div className='sm:basis-1/2 bg-sky-100 p-3 sm:p-5 rounded overflow-y-auto shadow-md'>
                    {error && <p className='text-pink-900'>{error}</p>}
                    {result && 
                        <UuidList uuids={result} />
                    }
                </div>
            }
        </div>
      </> 
    )
}

export default Uuid;
