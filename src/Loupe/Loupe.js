import React, { Component, PropTypes } from 'react';
import {
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom';
import LoupePortal from './LoupePortal';

export default class Loupe extends Component {
    static propTypes = {
        classNames: PropTypes.arrayOf(PropTypes.string),
        loupeClassNames: PropTypes.arrayOf(PropTypes.string),
        image: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        isShown: PropTypes.bool,
        styles: PropTypes.obj,
        loupeStyles: PropTypes.obj
    };

    static defaultProps = {
        image: '',
        classNames: [''],
        loupeClassNames: [''],
        width: 100,
        height: 100,
        isShown: false,
        styles: {}
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            mountNode: null,
            isShown: props.isShown,
            loupe: { top: 0, left: 0 },
            big: { top: 0, left: 0 }
        }
    }

    componentWillMount() {
        const mountNode = document.createElement('div');
        mountNode.className  = 'ReactLoupe';
        document.body.appendChild(mountNode);
        this.setState({ mountNode: mountNode });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isShown !== this.state.isShown) {
            this.setState({ isShown: nextProps.isShown });
        }
    }

    onMouseEnter(event) {
        this.setState({ isShown: true });
    }

    onMouseLeave(event) {
        this.setState({ isShown: false });
    }

    onMouseMove(event) {
        const width = this.props.width / 2;
        const height = this.props.height / 2;
        const x = event.pageX;
        const y = event.pageY;

        const imgElm = this.state.mountNode.children[0].children[0];
        const img = imgElm.getBoundingClientRect();

        const rect = this.refs.container.getBoundingClientRect();

        const shouldHide = (
            x > rect.width + rect.left + 10
            || x < rect.left - 10
            || y > rect.height + rect.top + 10
            || y < rect.top - 10
        );

        this.setState({
            isShown: shouldHide ? false : true,
            loupe: {
                top: y - height,
                left: x - width
            },
            big: {
                top: -(((y - rect.top) / rect.height) * img.height - height),
                left: -(((x - rect.left) / rect.width) * img.width - width)
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        const props = Object.assign({}, nextProps, nextState);
        renderSubtreeIntoContainer(this, (<LoupePortal {...props} />), this.state.mountNode);
    }

    render() {
        const { image, classNames, styles } = this.props;

        const containerClassNames = `loupe-container ${classNames.join(' ')}`;

        const requiredStyles = {
            display: 'inline-block',
            position: 'relative'
        };

        const overriddenStyles = Object.assign({
            zIndex: '1',
            width: '100px',
            height: '100px'
        }, styles);

        const finalStyles = Object.assign(overriddenStyles, requiredStyles);

        return (
            <img src={image}
                 width={finalStyles.width}
                 height={finalStyles.height}
                 className={containerClassNames}
                 style={finalStyles}
                 ref="container"
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
            </img>
        );
    }
}