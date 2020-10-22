import React, { ReactElement } from 'react'
import AnimeItem from './AnimeItem'
import SearchBar from './SearchBar'

interface Props {
    listOfAnimes: any[]
}

export default function AnimeComponent({ listOfAnimes }: Props): ReactElement {
    return (
        <>
            <div style={{ height: '50px', width: '75%', padding: '1em 0' }}>
                <SearchBar />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '75%', justifyContent: 'center', alignItems: 'center' }}>
                {listOfAnimes?.map(({ anime_id: id, anime_folder: slug, anime_name: title, anime_img_url: image }) =>
                    <AnimeItem key={id} id={id} slug={slug} title={title} image={image} />
                )}
            </div>
        </>

    )
}
