import React from 'react'
import CanvasModel from './Canvas';
import { Typography, Grid, Button } from "@material-ui/core"
const CanvasContainer = () => {
    const style = {
        textAlign: "center",
    }

    return (
        <div>
            <Grid container style={{ marginTop: "10em", position: "absolute" }} justify="center">
                <Grid item xs={4}>
                    <Button variant='contained'>
                        Backside
                    </Button>
                </Grid>
            </Grid>
            < CanvasModel />
        </div>
    )
}

export default CanvasContainer;