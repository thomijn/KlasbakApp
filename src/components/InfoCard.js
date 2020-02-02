import React from 'react'
import { Card, CardContent, CardHeader, Grid, makeStyles, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from '../store';
import { useSpring, a } from 'react-spring';

const useStyle = makeStyles({
    card: {
        position: "absolute",
        bottom: "10em",
        zIndex: 2,
    }
})

const InfoCard = () => {
    const classes = useStyle()

    const { setPage, page } = useStore()
    const AnimatedCard = a(Card)
    const animatedProps = useSpring({
        from: {
            transform: "translateY(0em)",
            opacity: 0,
        },
        to: {
            transform: page === "info" ? "translateY(-1em)" : "translateY(0em)",
            opacity: page === "info" ? 1 : 0,
        },
    })

    return (
        <div>
            {page === "info" &&
                <a.div >
                    <Grid className={classes.card} container justify="center" alignItems="center">
                        <Grid item xs={10} lg={6}>
                            <AnimatedCard style={animatedProps} elevation={8} >
                                <CardHeader
                                    align="center"
                                    title="Info"
                                    action={
                                        <IconButton onClick={() => {
                                            setPage("home")
                                        }} aria-label="settings">
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    <Grid container style={{ textAlign: "center" }} justify="center">
                                        <Grid item xs={10}>
                                            <Typography variant="body1">
                                                Ons concept biedt een platform aan voor basisscholen om hun resultaten bij te houden en te
    delen met soortgenoten. Door middel van slimme prullenbakken wordt er data verzameld
    om de scores te berekenen. Deze gegevens worden vervolgens naar het online platform
    gestuurd waaruit een ranking bepaalt wordt.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </AnimatedCard>
                        </Grid>
                    </Grid>
                </a.div>
            }
        </div>
    )
}

export default InfoCard
