'use client';

import React, { FC } from 'react';


const Base64: FC = () => {

    const [base64, setBase64] = React.useState<string|null>();
    const [error, setError] = React.useState<string|null>();

    const handleBase64 = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const action = formData.get('action');
        const input = formData.get('input');
        setError(null);
        setBase64(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/base64`, {
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
                    setBase64(json_content.data);
                });
            } else {
                setError('An error occurred. Please try again later.')
            }
        });
    }

    return (
        <>
         <div className='flex flex-row space-x-4 my-5'>
             <div className='basis-1/2 bg-gray-100 p-5 rounded'>
                 <h2 className='font-bold text-2xl mb-4 text-indigo-500'>Base64 encode & decode</h2>
                 <form action="" onSubmit={handleBase64} method="post">
                     <div>
                         <label htmlFor="action" className='block'>Action</label>
                         <select 
                             id="action" 
                             name="action" 
                             className='rounded focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
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
                             rows={3}
                             cols={70}
                             maxLength={255}
                             className='rounded focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400' 
                             required 
                         />
                     </div>
                     <button type="submit" className='font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded p-3 my-5'>Process</button>
                 </form>
             </div>
             <div className='basis-1/2 bg-indigo-100 p-5 rounded overflow-y-auto'>
                {error && <p className='text-pink-900'>{error}</p>}
                {base64 && <p className='text-indigo-900'>{base64}</p>}
             </div>
         </div>
       </> 
     )
}

export default Base64;