import React, { ReactElement, useRef } from 'react'
import '../styles/search.css'
interface Props {

}

export default function SearchBar({ }: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null)

    return (
        <form className='search' onSubmit={() => console.log(searchRef.current?.value)}>
            <input ref={searchRef} type='text' placeholder='Boku no Hero Academia' />
            <input type='submit' value='SEARCH' />
        </form>
    );
}

