import React, { Component, PropTypes } from 'react';
import {
    unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom';
import LoupePortal from './LoupePortal';

export default class Loupe extends Component {
    static propTypes = {
        classNames: PropTypes.arrayOf(PropTypes.string),
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

        const container = this.refs.container.getBoundingClientRect();
        const { left, top } = container;

        const shouldHide = (
            x > container.width + left + 10
            || x < left - 10
            || y > container.height + top + 10
            || y < top - 10
        );

        this.setState({
            isShown: shouldHide ? false : true,
            container: container,
            img: img,
            loupe: {
                top: y - height,
                left: x - width
            },
            big: {
                top: -(((y - top) / container.height) * img.height - height),
                left: -(((x - left) / container.width) * img.width - width)
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

        const containerStyles = Object.assign(overriddenStyles, requiredStyles);

        return (
            <img src={image}
                 width={containerStyles.width}
                 height={containerStyles.height}
                 className={containerClassNames}
                 style={containerStyles}
                 ref="container"
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
            </img>
        );
    }
}