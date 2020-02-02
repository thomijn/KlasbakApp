import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Grid, makeStyles, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from '../store';
import { useSpring, a } from 'react-spring';

const useStyle = makeStyles({
    card: {
        position: "absolute",
        marginTop: "10em",
        zIndex: 2,
    }
})

const BinCard = () => {
    const classes = useStyle()
    const [reset, set] = useState(false)
    const [reverse, setReverse] = useState(false)

    const { setSelectedBin, setPage, selectedBin } = useStore()
    const AnimatedCard = a(Card)
    const animatedProps = useSpring({
        from: {
            transform: "translateY(0em)",
            opacity: 0,
        },
        to: {
            transform: selectedBin ? "translateY(-1em)" : "translateY(0em)",
            opacity: selectedBin ? 1 : 0,
        },
        reset: reset,
        reverse: reverse
    })

    useEffect(() => {
        if (selectedBin) {
            set(true)
            setReverse(false)
        } else if (!selectedBin) {
            setReverse(true)
        }
    }, [selectedBin])

    return (
        <div>
            {selectedBin &&
                <a.div >
                    <Grid className={classes.card} container justify="center" alignItems="center">
                        <Grid item xs={10} lg={5}>
                            <AnimatedCard style={animatedProps} elevation={8} >
                                <CardHeader
                                    align="center"
                                    title={selectedBin && selectedBin.name && selectedBin.name}
                                    subheader="laatst geupdate om: 13:22"
                                    action={
                                        <IconButton onClick={() => {
                                            setSelectedBin(undefined)
                                            setPage("home")
                                        }} aria-label="settings">
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    <Grid spacing={4} container style={{ textAlign: "center", marginBottom: "1.5em" }} justify="center" >
                                        <Grid style={{ backgroundColor: "#dedede", padding: "0.5em", borderRadius: "4px" }} item xs={5}>
                                            <Grid container justify="center" direction="column">
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Huidig gewicht:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">
                                                        {selectedBin.weight}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ backgroundColor: parseInt(selectedBin.percentage) > 40 ? "#d66767" : "#7fd667", padding: "0.5em", borderRadius: "4px" }} item xs={5}>
                                            <Grid container justify="center" direction="column">
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Percentage
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">
                                                        {selectedBin.percentage}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
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

export default BinCard
