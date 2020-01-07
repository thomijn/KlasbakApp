import React, { useState } from 'react'
import CanvasModel from './Canvas';
import { Grid, Button } from "@material-ui/core"
import Title from './Title';

const CanvasContainer = () => {
    const [backside, setBackside] = useState(false)

    return (
        <div>
            <Grid container style={{ marginTop: "22em", position: "absolute", zIndex: "2", textAlign: "center" }} justify="center">
                <Grid item xs={4}>
                    <Button onClick={() => setBackside(!backside)} variant='outlined' size="large">
                        Achterkant
                    </Button>
                </Grid>
            </Grid>
            <Title />
            < CanvasModel backside={backside} />
        </div>
    )
}

export default CanvasContainer;