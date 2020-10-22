import React, { ReactElement, useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Loading from './Loading';
import useDataFetching from './useDataFetching';
import { ANIME_URL, ANIME_FIRST_EPISODE_URL, SR_IMAGE_URL } from '../shared/constants'

interface Props {

}



function AnimeDetail({ }: Props): ReactElement {
    const match = useRouteMatch<{ id: string, slug: string }>()
    const { loading, results, error } = useDataFetching({
        dataSource: ANIME_URL(match.params.id)
    });


    if (loading || error) {
        return loading ? <Loading /> : error
    }

    if (results && results[0]) {
        return (
            <div>
                <div className='episode-view'>
                    <div className='poster-background'>
                    </div>
                    <div>
                        <img src={ANIME_FIRST_EPISODE_URL(match.params.id, match.params.slug, 'dub')} alt={`${match.params.id}_${match.params.slug}`} />
                    </div>
                </div>
                <h1>{results[0].anime_name}</h1>
                <h3>{results[0].anime_description}</h3>
                <img src={SR_IMAGE_URL(results[0].anime_id, results[0].anime_folder)} alt={results[0].anime_name} />
            </div>
        );
    }

    return (
        <div>
            No information about this anime
        </div>
    )
}

export default AnimeDetail;

