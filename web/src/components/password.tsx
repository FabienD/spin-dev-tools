'use client';

import React, { FC } from 'react';


const Password: FC = () => {

    const [length, setLength] = React.useState<number>(20);
    const [numbers, setNumbers] = React.useState<boolean>(true);
    const [lowercase_letters, setLowercaseLetters] = React.useState<boolean>(true);
    const [uppercase_letters, setUppercaseLetters] = React.useState<boolean>(true);
    const [symbols, setSymbols] = React.useState<boolean>(true);
    const [spaces, setSpaces] = React.useState<boolean>(false);
    const [exclude_similar_characters, setExcludeSimilarCharacters] = React.useState<boolean>(true);
    const [strict, setStrict] = React.useState<boolean>(true);
    const [result, setResult] = React.useState<string|null>();
    const [error, setError] = React.useState<string|null>();

    const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLength(parseInt(event.target.value));
    }

    const handleNumbersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNumbers(event.target.checked);
    }

    const handleLowercaseLettersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLowercaseLetters(event.target.checked);
    }

    const handleUppercaseLettersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUppercaseLetters(event.target.checked);
    }

    const handleSymbolsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSymbols(event.target.checked);
    }

    const handleSpacesChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSpaces(event.target.checked);
    }

    const handleExcludeSimilarCharactersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setExcludeSimilarCharacters(event.target.checked);
    }

    const handleStrictChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setStrict(event.target.checked);
    }


    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
        setError(null);
        setResult(null);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${API_URL}/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                length,
                numbers,
                lowercase_letters,
                uppercase_letters,
                symbols,
                spaces,
                exclude_similar_characters,
                strict
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
                <h2 className='font-bold text-xl sm:text-2xl mb-4 text-blue-500'>Password generator</h2>
                <form action="" onSubmit={handleSubmit} method="post">
                    <div className="relative flex items-start">
                        <div className="flex leading-10 pr-5">
                            <label htmlFor="length">Length of the password.</label>
                        </div>
                        <div className="items-center">
                            <input
                                id="length"
                                aria-describedby="password-length"
                                name="length"
                                type="text"
                                maxLength={2}
                                size={2}
                                value={length}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleLengthChange}
                            />
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="numbers"
                                aria-describedby="numbers-description"
                                name="numbers"
                                type="checkbox"
                                checked={numbers}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleNumbersChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="numbers">Use numbers</label>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="lowercase_letters"
                                aria-describedby="lowercase_letters-description"
                                name="lowercase_letters"
                                type="checkbox"
                                checked={lowercase_letters}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleLowercaseLettersChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="lowercase_letters">Use lowercase letters</label>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="uppercase_letters"
                                aria-describedby="uppercase_letters-description"
                                name="uppercase_letters"
                                type="checkbox"
                                checked={uppercase_letters}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleUppercaseLettersChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="lowercase_letters">Use uppercase letters</label>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="symbols"
                                aria-describedby="symbols-description"
                                name="symbols"
                                type="checkbox"
                                checked={symbols}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleSymbolsChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="symbols">Use symbols</label>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="spaces"
                                aria-describedby="space-description"
                                name="spaces"
                                type="checkbox"
                                checked={spaces}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleSpacesChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="spaces">Use spaces</label>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="exclude_similar_characters"
                                aria-describedby="exclude_similar_characters-description"
                                name="exclude_similar_characters"
                                type="checkbox"
                                checked={exclude_similar_characters}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleExcludeSimilarCharactersChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="exclude_similar_characters">Exclude similar characters</label>
                            <p className="text-gray-500 text-sm italic">Whether to exclude similar characters, iI1loO0&quot;&apos;`|.</p>
                        </div>
                    </div>   
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="strict"
                                aria-describedby="strict-description"
                                name="strict"
                                type="checkbox"
                                checked={strict}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                onChange={handleStrictChange}
                            />
                        </div>
                        <div className="ml-3 leading-6">
                            <label htmlFor="strict">Strict</label>
                            <p className="text-gray-500 text-sm italic">Whether the password rules are strict.</p>
                        </div>
                    </div>
                    <button type="submit" className='font-bold text-white bg-blue-500 hover:bg-blue-600 rounded p-3 my-5'>Process</button>
                </form>
            </div>
            {(error || result) &&
                <div className='sm:basis-1/2 bg-blue-100 p-3 sm:p-5  rounded overflow-y-auto shadow-md'>
                    {error && <p className='text-pink-800'>{error}</p>}
                    {result && <p className='text-blue-600'><pre>{result}</pre></p>}
                </div>
            }
        </div>
        </> 
    )
}

export default Password;