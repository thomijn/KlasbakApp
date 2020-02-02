import React, { useState } from 'react'
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
    const [hover, setHover] = useState(false)
    const animatedProps = useSpring({
        transform: hover ? "translateY(-20rem)" : "translateY(0rem)",
        config: config.gentle
    })

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <a.div onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} style={animatedProps}>
                    <Typography className={classes.text} variant="h1">DE <br></br> KLASBAK</Typography>
                </a.div>
            </Grid>
        </Grid>
    )
}

export default Title