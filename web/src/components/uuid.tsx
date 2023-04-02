'use client';

import React, { FC } from 'react';
import UuidList from './uuidList';


const Uuid: FC = () => {
    const [uuids, setUuids] = React.useState<string[]|null>();
    const [error, setError] = React.useState<string|null>();

    const handleUuid = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const version = formData.get('version');
        const sample_to_generate = formData.get('sample_to_generate');
        setError(null);
        setUuids(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/uuid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'version': version ? parseInt(version.toString()) : '',
                'sample_to_generate': sample_to_generate ? parseInt(sample_to_generate.toString()) : ''
            }),
        }).then((response) => {
            
            if (response.status === 200) {
                let json = response.json();
                json.then((json_content) => {
                    setUuids(json_content.data);
                });
            } else {
                setError('An error occurred. Please try again later.')
            }
        });
    }

    return (
       <>
        <div className='flex flex-row space-x-4 h-40 max-h-40'>
            <div className='basis-1/2 bg-gray-100 p-5 rounded'>
                <h2 className='font-bold text-2xl mb-4 text-purple-500'>Uuid generator</h2>
                <form action="" method="post" onSubmit={handleUuid} className='flex space-x-2'>
                    <div>
                        <label htmlFor="version" className='block'>Version</label>
                        <select 
                            id="version" 
                            name="version" 
                            className='rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                        >
                            <option value="4">Version 4</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sample_to_generate" className='block'>Number to generate</label>
                        <input 
                            type="text" 
                            id="sample_to_generate" 
                            name="sample_to_generate" 
                            placeholder="1 to 99" 
                            maxLength={2} 
                            required 
                            className='rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400' 
                        />
                    </div>
                    <button type="submit" className='font-bold text-white bg-purple-500 hover:bg-violet-600 rounded p-3 my-5'>Generate</button>
                </form>
            </div>
            <div className='basis-1/2 bg-pink-100 p-5 rounded overflow-scroll'>           
                {error && <p className='text-pink-900'>{error}</p>}
                {uuids && 
                    <UuidList uuids={uuids} />
                }
            </div>
        </div>
      </> 
    )
}

export default Uuid;
