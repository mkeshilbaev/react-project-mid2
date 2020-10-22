import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

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
    return (
        <div className='anime-item' style={{ flex: '1', padding: '1em', width: 'auto' }}>
            <div className='anime-item-image' style={animeItemStyles}>
                <Link to={`/anime/${id}/${slug}`}>
                    <img src={image} alt="title" style={{ width: '100%', height: '100%' }} />
                </Link>
            </div>
            <div className='anime-item-title' style={{ ...animeItemStyles, height: '50px', alignItems: 'center', backgroundColor: '#ffcccb' }}>
                {title}
            </div>

        </div>
    );
}

