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
            loupe: { top: 0, left: 0 }
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
        const width = this.props.width / 2;
        const height = this.props.height / 2;
        const x = event.pageX;
        const y = event.pageY;
        let containerElm = event.target;
        if(!containerElm.className.includes('loupe-container')) {
            containerElm = containerElm.parentElement.parentElement;
        }
        const imgElm = containerElm.children[0];

        const container = containerElm.getBoundingClientRect();
        const { left, top } = container;

        const img = imgElm.getBoundingClientRect();

        const shouldHide = (
            x > container.width + left + 10
            || x < left - 10
            || y > container.height + top + 10
            || y < top - 10
        );

        this.setState({
            isShown: shouldHide ? false : true,
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

    render() {
        const { image, classNames, width, height } = this.props;
        const { isShown, loupe, big } = this.state;

        const containerClassNames = `loupe-container ${classNames.join(' ')}`;

        const containerStyle = {
            position: 'relative',
            zIndex: '1',
            height: '200px',
            width: '200px',
            border: '1px solid red',
            backgroundImage: `url(${image}`,
            backgroundSize: 'contain'
        };

        const loupeStyle = {
            position: 'absolute',
            overflow: 'hidden',
            zIndex: '2',
            top: loupe.top,
            left: loupe.left,
            width: `${width}px`,
            height: `${height}px`,
            display: isShown ? 'block' : 'none',
            borderRadius: '50%',
            border: '1px solid black'
        };

        const imageStyle = {
            position: 'absolute',
            zIndex: '2',
            top: big.top,
            left: big.left
        };

        return (
            <div className={containerClassNames}
                 style={containerStyle}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
               <div style={loupeStyle}>
                  <img style={imageStyle} src={image} />
               </div>
            </div>
        );
    }
}