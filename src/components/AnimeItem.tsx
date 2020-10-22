import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TypeContext } from '../App';

interface Props {
    id: string,
    slug: string,
    title: string,
    image: string
}

const animeItemStyles = {
    display: 'flex',
    justifyContent: 'center',
    width: '210px',
    height: '300px',
    margin: '0 auto'
}

export default function AnimeItem({ id, slug, title, image }: Props): ReactElement {
    const typeContext = useContext(TypeContext)

    return (
        <div className='anime-item' style={{ flex: '1', padding: '1em', width: 'auto' }}>
            <div className='anime-item-image' style={animeItemStyles}>
                <Link to={`/${typeContext.type}/${id}/${slug}`}>
                    <img src={image} alt="title" style={{ width: '100%', height: '100%' }} />
                </Link>
            </div>
            <div className='anime-item-title' style={{ ...animeItemStyles, height: '50px', alignItems: 'center', backgroundColor: 'white' }}>
                {title}
            </div>

        </div>
    );
}

