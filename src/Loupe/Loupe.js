import React, { Component, PropTypes } from 'react';

export default class Loupe extends Component {
    static propTypes = {
        image: PropTypes.string,
        classNames: PropTypes.arrayOf(PropTypes.string),
        width: PropTypes.number,
        height: PropTypes.number
    };

    static defaultProps = {
        image: '',
        classNames: [''],
        width: 100,
        height: 100
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            isShown: props.isShown,
            big: { top: 0, left: 0 },
            small: { top: 0, left: 0 }
        }
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
        let { width, height } = this.props;
        width = width / 2;
        height = height / 2;
        const x = event.pageX;
        const y = event.pageY;
        const smallElm = event.target;
        const bigElm = smallElm.children[0];

        const smallWidth = smallElm.offsetWidth;
        const smallHeight = smallElm.offsetHeight;

        const big = bigElm.getBoundingClientRect();
        const small = smallElm.getBoundingClientRect();

        const bl = -(((x - small.left) / smallWidth) * big.width - width) | 0;
        const bt = -(((y - small.top) / smallHeight) * big.height - height) | 0;

        const sl = x - width;
        const st = y - height;

        const shouldHide = (
            x > smallWidth + small.left + 10
            || x < small.left - 10
            || y > smallHeight + small.top + 10
            || y < small.top - 10
        );

        this.setState({
            isShown: shouldHide ? false : true,
            small: { top: st, left: sl },
            big: { top: bt, left: bl }
        });
    }

    render() {
        const { image, classNames, width, height } = this.props;
        const { isShown, small, big } = this.state;

        const containerClassNames = `container ${classNames.join(' ')}`;

        const containerStyle = {
            position: 'relative',
            zIndex: '1',
            height: '200px',
            width: '200px',
            border: '1px solid red',
            backgroundImage: `url(${image}`,
            backgroundSize: 'contain'
        };

        const bigStyle = {
            position: 'absolute',
            overflow: 'hidden',
            zIndex: '2',
            top: big.top,
            left: big.left,
            width: `${width}px`,
            height: `${height}px`,
            display: isShown ? 'block' : 'none',
            borderRadius: '50%',
            border: '1px solid black'
        };

        const smallStyle = {
            position: 'absolute',
            zIndex: '2',
            top: small.top,
            left: small.left
        };

        return (
            <div className={containerClassNames}
                 style={containerStyle}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
               <div className="big" style={bigStyle}>
                  <img className="small" style={smallStyle} src={image} />
               </div>
            </div>
        );
    }
}