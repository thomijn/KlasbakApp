import React from 'react'
import CanvasModel from './Canvas';

import BinCard from './BinCard';
import InfoCard from './InfoCard';

const CanvasContainer = () => {
    return (
        <div>
            <BinCard />
            <InfoCard />
            < CanvasModel />
        </div>
    )
}

export default CanvasContainer;