import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { a, config, useSpring } from "react-spring"

const styles = makeStyles({
    container: {
        position: "absolute",
        top: "4em"
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontFamily: 'Josefin Sans',
        fontWeight: "800",
        fontSize: "8em"
    }
});


const Title = () => {
    const classes = styles()

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography className={classes.text} variant="h1">DE <br></br> KLASBAK</Typography>
            </Grid>
        </Grid>
    )
}

export default Title