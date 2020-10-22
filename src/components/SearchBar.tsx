import { type } from 'os';
import React, { ReactElement, useContext, useRef } from 'react'
import { TypeContext } from '../App';
import '../styles/search.css'

interface Props {
}

export default function SearchBar({ }: Props): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null)
    const typeContext = useContext(TypeContext)

    return (
        <form className='search' onSubmit={() => console.log(searchRef.current?.value)}>
            <input ref={searchRef} type='text' placeholder={typeContext.placeholder} />
            <input type='submit' value='SEARCH' />
        </form>
    );
}

