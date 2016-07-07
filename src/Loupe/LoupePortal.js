import React, { Component, PropTypes } from 'react';

export default class LoupePortal extends Component {
    static propTypes = {
        image: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        isShown: PropTypes.bool,
        loupe: PropTypes.object,
        big: PropTypes.object
    };

    static defaultProps = {
        image: '',
        width: 100,
        height: 100,
        isShown: false,
        loupe: {},
        big: {}
    };
    
    render() {
        const { image, width, height, isShown, loupe, big, loupeClassNames, loupeStyles } = this.props;

        const classNames = `loupe ${loupeClassNames.join(' ')}`;

        const requiredLoupeStyles = {
            pointerEvents: 'none',
            position: 'absolute',
            overflow: 'hidden',
            top: loupe.top,
            left: loupe.left,
            width: `${width}px`,
            height: `${height}px`,
            display: isShown ? 'block' : 'none'
        };

        const overriddenStyles = Object.assign({
            zIndex: '2',
            border: '1px solid black'
        }, loupeStyles);

        const finalStyles = Object.assign(overriddenStyles, requiredLoupeStyles);

        const imageStyle = {
            position: 'absolute',
            zIndex: '2',
            top: big.top,
            left: big.left
        };

        return (
            <div className={classNames} style={finalStyles} >
                <img style={imageStyle} src={image} />
            </div>
        );
    }
}