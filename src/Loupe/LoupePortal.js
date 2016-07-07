import React, { Component, PropTypes } from 'react';

export default class LoupePortal extends Component {
    static propTypes = {
        image: PropTypes.string,
        container: PropTypes.object,
        loupe: PropTypes.object
    };

    static defaultProps = {
        image: '',
        container: {},
        loupe: {}
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            big: { top: 0, left: 0 }
        }
    }
    
    render() {
        const { image, width, height, isShown, loupe, big } = this.props;

        const loupeStyle = {
            pointerEvents: "none",
            position: 'absolute',
            overflow: 'hidden',
            zIndex: '2',
            top: loupe.top,
            left: loupe.left,
            width: `${width}px`,
            height: `${height}px`,
            display: isShown ? 'block' : 'none',
            border: '1px solid black'
        };

        const imageStyle = {
            position: 'absolute',
            zIndex: '2',
            top: big.top,
            left: big.left
        };

        return (
            <div style={loupeStyle} >
                <img style={imageStyle} src={image} />
            </div>
        );
    }
}