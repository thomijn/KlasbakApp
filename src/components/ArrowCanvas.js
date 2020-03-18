import React, { Component, useEffect } from 'react';
import { Arrow, Stage, Layer, Image } from 'react-konva';
import { useStore } from '../store';

function CustomArrow(props) {
    const { startPos, endPos, isDrawing } = props;
    const { setAnswer } = useStore()

    useEffect(() => {
        if (isDrawing) {
            setAnswer(false)
        }
    }, [isDrawing])

    return (
        <Arrow
            style={{ zIndex: 3 }}
            points={[startPos.x, startPos.y, endPos.x, endPos.y]}
            pointerLength={15}
            pointerWidth={15}
            fill="black"
            stroke="black"
            strokeWidth={4}
        />
    );
}

class VaderImage extends React.Component {
    state = {
        image: new window.Image()
    };
    componentDidMount() {
        this.state.image.src = "./pelvis.png";
        this.state.image.onload = () => {
            this.imageNode.getLayer().batchDraw();
        };
    }

    render() {
        return (
            <Image
                style={{ zIndex: -2 }}
                image={this.state.image}
                width={200}
                height={200}
                y={0}
                ref={node => {
                    this.imageNode = node;
                }}
            />
        );
    }
}

class ArrowCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            arrowStartPos: { x: 0, y: 0 },
            arrowEndPos: { x: 0, y: 0 }
        };
    }

    handleMouseDown = ({ evt }) => {
        const { offsetX, offsetY } = evt;
        this.setState({
            isDrawing: true,
            arrowStartPos: { x: offsetX, y: offsetY },
            arrowEndPos: { x: offsetX, y: offsetY }
        });
    };

    handleMouseUp = () => {
        const { isDrawing } = this.state;
        if (isDrawing) {
            this.setState({ isDrawing: false });
        }
    };

    handleMouseMove = ({ evt }) => {
        const { isDrawing } = this.state;
        const { offsetX, offsetY } = evt;

        if (isDrawing) {
            this.setState({
                arrowEndPos: { x: offsetX, y: offsetY }
            });
        }
    };

    render() {
        const { arrowEndPos, arrowStartPos, isDrawing } = this.state;
        return (
            <Stage
                width={200} height={200}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            >
                <Layer>
                    <VaderImage />
                    <CustomArrow isDrawing={isDrawing} startPos={arrowStartPos} endPos={arrowEndPos} />
                </Layer>
            </Stage>
        );
    }
}

export default ArrowCanvas

