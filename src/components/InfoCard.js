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
                                                Do duis anim excepteur excepteur et sit anim officia veniam. Magna cillum tempor excepteur velit eiusmod laborum adipisicing nostrud ea. Sit deserunt nulla in laborum. Incididunt sunt laboris laborum ad consectetur sunt ex mollit fugiat. Exercitation id eu pariatur est culpa. Esse nisi do aute amet nisi do fugiat ullamco tempor qui amet officia dolore sit. Aliquip fugiat aliqua consectetur pariatur id non commodo.
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
