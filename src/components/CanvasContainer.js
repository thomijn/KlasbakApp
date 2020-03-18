import React from 'react'
import CanvasModel from './Canvas';

import InfoCard from './InfoCard';
import Game from './Game';

const CanvasContainer = () => {
    return (
        <div>
            <InfoCard />
            <Game />
            <CanvasModel />
        </div>
    )
}

export default CanvasContainer;