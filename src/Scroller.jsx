import 'bootstrap/dist/css/bootstrap.css';
import './Scroller.css';

import React from 'react';
import useWindowDimensions from "./WindowHook";

export default class Scroller extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overlay: null,
            images: [],
            interval: undefined,
            bounded: true,
        }

        this.loadImages.bind(this);
        this.tick.bind(this);
        this.inBounds.bind(this);
        this.checkBounds.bind(this);
    }

    async loadImages () {
        await fetch('http://20.0.0.86:3000/group/false/10/')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    images: [...this.state.images, ...data],
                    refs: [],
                }, () => {
                    console.log(data);
                });
            });
    }

    inBounds(e) {
        const { width, height } = useWindowDimensions();
        const rect = e.getBoundingClientRect();
        return !(
            (rect.x + rect.width) < 0
            || (rect.y + rect.height) < 0
            || (rect.x > width || rect.y > height)
        );
    }

    checkBounds(e) {
        this.setState({ bounded: this.inBounds(e) });
    }

    async tick () {
        if (this.state.bounded) await this.loadImages();
        while (!this.state.bounded) {
            this.setState({
                images: this.state.images.slice(1),
            });
        }
    }

    async componentDidMount () {
        await this.tick();
        this.setState({
            interval: setInterval(this.tick, 10000),
        });
    }

    componentWillUnmount () {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            this.state.overlay
            ?? <div>
                {this.state.images.map((image) => <img className='display' src={image.url} alt='img'></img>)}
            </div>
        )
    }
}
