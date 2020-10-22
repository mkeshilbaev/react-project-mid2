import './App.css'
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import AnimeTab from './components/AnimeTab';
import AnimeDetail from './components/AnimeDetail';
import ErrorBoundary from './components/ErrorBoundary';
import withDataFetching from './components/withDataFetching';
import { API_URL, SR_IMAGE_URL } from './shared/constants'
interface Props {
    results?: any[];
    loading?: boolean;
    error?: any;
}


function App({ loading, results, error }: Props) {
    const [token, setToken] = useState('')

    if (results) {
        results.map((result) => {
            result['anime_img_url'] = SR_IMAGE_URL(result['anime_id'], result['anime_folder'])
        });
    }

    const changeToken = (e: string) => {
        setToken(e)
    }

    return (
        <div className="App">
            <Navbar token={token} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Switch>
                    <Route exact path='/anime'>
                        <ErrorBoundary>
                            <AnimeTab listOfAnimes={results ? results : []} />
                        </ErrorBoundary>
                    </Route>
                    <Route path='/anime/:id/:slug'>
                        <ErrorBoundary>
                            <AnimeDetail />
                        </ErrorBoundary>
                    </Route>
                    <Route path='/dorama'>
                        <h1>DORAMA</h1>
                    </Route>
                    <Route path='/login'>
                        <h1>LOGIN</h1>
                    </Route>
                    <Route path='/signup' render={(props) => (
                        <Registration {...props} setToken={changeToken} />
                    )} />
                    <Route path='/'>
                        <h1>HOME</h1>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default withDataFetching({
    dataSource: API_URL
})(App);