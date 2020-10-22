import './App.css'
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import AnimeTab from './components/AnimeTab';
import AnimeDetail from './components/AnimeDetail';
import ErrorBoundary from './components/ErrorBoundary';
import withDataFetching from './components/withDataFetching';
import { API_URL, SR_IMAGE_URL, DORAMAS } from './shared/constants'
import Auth from './components/Auth';

interface Props {
    results?: any[];
    loading?: boolean;
    error?: any;
}

const inputPlaceholders = {
    anime: {
        type: 'anime',
        placeholder: 'Boku no Hero Academia'
    },
    dorama: {
        type: 'dorama',
        placeholder: 'Lovely Horribly'
    }
}

export const TypeContext = React.createContext<{ type: string, placeholder: string }>(inputPlaceholders.dorama)


function App({ loading, results, error }: Props) {
    const [token, setToken] = useState('')

    if (results) {
        results.map((result) => {
            result['anime_img_url'] = SR_IMAGE_URL(result['anime_id'], result['anime_folder'])
        });
    }

    const changeToken = (token: string) => {
        setToken(token)
    }

    return (
        <div className="App">
            <Navbar token={token} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Switch>
                    <Route exact path='/anime'>
                        <ErrorBoundary>
                            <TypeContext.Provider value={inputPlaceholders.anime}>
                                <AnimeTab listOfAnimes={results ? results : []} />
                            </TypeContext.Provider>
                        </ErrorBoundary>
                    </Route>
                    <Route path='/anime/:id/:slug'>
                        <ErrorBoundary>
                            <AnimeDetail />
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/dorama'>
                        <TypeContext.Provider value={inputPlaceholders.dorama}>
                            <AnimeTab listOfAnimes={DORAMAS} />
                        </TypeContext.Provider>
                    </Route>
                    <Route path='/dorama/:id/:slug'>
                        <ErrorBoundary>
                            <AnimeDetail />
                        </ErrorBoundary>
                    </Route>
                    <Route path='/login' render={(props) => (
                        <Auth {...props} setToken={changeToken} />
                    )} />
                    <Route path='/signup' render={(props) => (
                        <Registration {...props} setToken={changeToken} />
                    )} />
                    <Route path='/'>
                        <h1>HOME</h1>
                    </Route>
                </Switch>
            </div>
        </div >
    );
}

export default withDataFetching({
    dataSource: API_URL
})(App);