import React from 'react'
import ArrowCanvas from './ArrowCanvas'
import { Grid, Button, Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useStore } from '../store'

const Game = () => {
    const [{ x, y, translate }, set] = useSpring(() => ({
        x: 0, y: 0,
        translate: 'translateX(0px)',
    }))
    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        console.log(mx)
        set({
            x: down ? mx : 0, y: down ? my : 0, translate: mx < -200 ? 'translateX(-550px)' : 'translateX(0px)',
        })
    })

    const { page, setPage, setRotate, answer, setAnswer } = useStore()
    return (
        page === 'start' || page === 'end' ?
            <animated.div {...bind()} style={{
                cursor: 'url(https://www.google.com/intl/en_ALL/mapfiles/openhand.cur), auto',
                transform: translate,
                width: '600px',
                height: '300px',
                position: 'absolute',
                zIndex: 100,
                bottom: 25,
                left: 25,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '10px'
            }}>
                <Grid style={{ height: '100%' }} container alignItems='center'>
                    <Grid item style={{ margin: '25px', width: '600px' }}>
                        <Grid container spacing={2} direction='row'>
                            <Grid item xs={6}>
                                <ArrowCanvas />
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={6} direction='column' alignItems='space-between'>
                                    <Grid item xs={12}>
                                        {page === 'start' ?
                                            <div>
                                                <Typography style={{ marginBottom: '10px', pointerEvents: 'none' }} variant='body1'>
                                                    Draw an arrow in the canvas to the left that indicates in which way you are looking at the pelvis.
                                    </Typography>
                                                <Typography variant='caption'>
                                                    Tip: You can drag this window to the left to see more.
                                    </Typography>
                                            </div>
                                            :
                                            null
                                        }
                                    </Grid>
                                    {
                                        page === 'start' ?
                                            <Grid item xs={12}>
                                                <Button disabled={answer} onClick={() => setPage('end')} fullWidth color='primary' variant='contained'>enter answer</Button>
                                            </Grid>
                                            :
                                            <Grid item xs={12}>
                                                <Button onClick={() => {
                                                    setPage('home')
                                                    setRotate(false)
                                                    setAnswer(true)
                                                }} fullWidth color='primary' variant='contained'>Reset</Button>
                                            </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </animated.div >
            :
            null
    )
}

export default Game
