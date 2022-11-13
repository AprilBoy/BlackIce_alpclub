import React from 'react';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page/home-page';
import { AboutPage } from './pages/about-page/about-page';
import { SchoolPage } from './pages/school-page/school-page';
import { TravelsPage } from './pages/travels-page/travels-page';
import { TrainingPage } from './pages/training-page/training-page';
import { AdvancedBlockPage } from './pages/school-page/advanced-block-page/advanced-block-page';
import { BasementBlockPage } from './pages/school-page/basement-block-page/basement-block-page';
import { NewbieBlockPage } from './pages/school-page/newbie-block-page/newbie-block-page';
import { RescueBlockPage } from './pages/school-page/rescue-block-page/rescue-block-page';
import { SnowIceBlockPage } from './pages/school-page/snow-ice-block-page/snow-ice-block-page';
import { ScrollTopHelper } from './components/helpers/scroll-top-helper';
import { ScrollToTop } from './components/scroll-top/scroll-top';

function App() {
    return (
        <div className='App'>
            <Router>
                <ScrollTopHelper />
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route
                        index
                        element={<HomePage />}
                    />
                    <Route
                        path='/about'
                        element={<AboutPage />}
                    />
                    <Route
                        path='/training'
                        element={<TrainingPage />}
                    />
                    <Route
                        path='/travels'
                        element={<TravelsPage />}
                    />
                    <Route
                        path='/school'
                        element={<SchoolPage />}
                    />
                    <Route
                        path='/school/newbie'
                        element={<NewbieBlockPage />}
                    />
                    <Route
                        path='/school/basement'
                        element={<BasementBlockPage />}
                    />
                    <Route
                        path='/school/advanced'
                        element={<AdvancedBlockPage />}
                    />
                    <Route
                        path='/school/snow_and_ice'
                        element={<SnowIceBlockPage />}
                    />
                    <Route
                        path='/school/rescue'
                        element={<RescueBlockPage />}
                    />
                    <Route
                        path='*'
                        element={<Navigate to='/' />}
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
