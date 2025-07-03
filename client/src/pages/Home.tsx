import React from 'react';
import Jumbotron from '../components/Jumbotron';
import Body from '../components/Body';
import Description from '../components/Description';

const Home: React.FC = () => {
    return (
        <div>
            <Jumbotron />
            <Body />
            <Description />
        </div>
    )
}

export default Home;
