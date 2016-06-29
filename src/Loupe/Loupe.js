import React, {Component, PropTypes} from 'react';

export default class Loupe extends Component {
    static propTypes = {
        image: PropTypes.string,
        classNames: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        image: '',
        classNames: ['']
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            isShown: props.isShown,
            top: 0,
            letf: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isShown !== this.state.isShown) {
            this.setState({
                isShown: nextProps.isShown
            });
        }
    }

    onMouseEnter(event) {
        this.setState({
            isShown: true
        });
    }

    onMouseLeave(event) {
        this.setState({
            isShown: false
        });
    }

    onMouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;
        this.setState({
            top: y,
            left: x
        });
    }

    render() {
        const { image, classNames } = this.props;
        const { isShown, top, left } = this.state;

        const containerStyle = {
            position: 'relative',
            zIndex: '1',
            height: '200px',
            width: '200px',
            border: '1px solid red',
            backgroundImage: `url(${image}`,
            backgroundSize: 'contain'
        };

        const containerClassNames = `container ${classNames.join(' ')}`;

        const loupeStyle = {
            position: 'absolute',
            top: top,
            left: left,
            zIndex: '2',
            overflow: 'hidden',
            display: isShown ? 'block' : 'none',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1px solid black'
        };

        return (
            <div className={containerClassNames}
                 style={containerStyle}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}>
               <div className="loupe" style={loupeStyle}>
                  <img src={image} />
               </div>
            </div>
        );
    }
}