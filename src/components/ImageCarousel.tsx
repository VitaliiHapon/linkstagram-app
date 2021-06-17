import React from "react";
import { authApi } from "../adapters/auth";
import { photosApi } from "../adapters/photos";
import '../css/image-carousel.css';

type ImageCarouselProps = {
    imageUrls: string[];
    onIndexChanged?: (i: number, total: number) => void;
    renderControl?: boolean;
    onImageClicked?: () => void;
    width?: number,
    height?: number
}

class ImageCarousel extends React.Component<ImageCarouselProps, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            imageUrlA: this.props.imageUrls[0],
            imageUrlB: this.props.imageUrls[1],
            direction: 'reverse',
            animA: 'img-cr-image-a',
            animB: 'img-cr-image-b',
            initial: true
        }
    }

    previous() {
        if (this.state.index > 0) {
            this.restartAnimation(() => {

                this.setState({
                    initial: false,
                    direction: 'normal',
                    animA: 'img-cr-image-a',
                    animB: 'img-cr-image-b',
                    index: this.state.index - 1,
                    imageUrlA: this.props.imageUrls[this.state.index - 1],
                    imageUrlB: this.props.imageUrls[this.state.index],
                });

            });
        }
    }

    next() {
        if (this.state.index < this.props.imageUrls.length - 1) {
            this.restartAnimation(() => {

                this.setState({
                    initial: false,
                    direction: 'reverse',
                    animA: 'img-cr-image-a',
                    animB: 'img-cr-image-b',
                    index: this.state.index + 1,
                    imageUrlA: this.props.imageUrls[this.state.index],
                    imageUrlB: this.props.imageUrls[this.state.index + 1],
                });

            });
        }


    }

    restartAnimation(callback: () => void) {
        this.setState({
            restart: true
        }, () => {
            this.setState({
                restart: false
            }, callback);
        });
    }

    renderLeftButton() {
        if (this.state.index == 0)
            return null;
        else
            return (<div className=" img-cr-buttons img-cr-button-left">

                <div onClick={() => this.previous()}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" fill="white" />
                        <path d="M9 14.75C8.44772 14.75 8 15.1977 8 15.75C8 16.3023 8.44772 16.75 9 16.75V14.75ZM22.5 15.75L23.2071 16.4571C23.5976 16.0666 23.5976 15.4334 23.2071 15.0429L22.5 15.75ZM16.4571 8.29289C16.0666 7.90237 15.4334 7.90237 15.0429 8.29289C14.6524 8.68342 14.6524 9.31658 15.0429 9.70711L16.4571 8.29289ZM15.0429 21.7929C14.6524 22.1834 14.6524 22.8166 15.0429 23.2071C15.4334 23.5976 16.0666 23.5976 16.4571 23.2071L15.0429 21.7929ZM9 16.75H22.5V14.75H9V16.75ZM23.2071 15.0429L16.4571 8.29289L15.0429 9.70711L21.7929 16.4571L23.2071 15.0429ZM21.7929 15.0429L15.0429 21.7929L16.4571 23.2071L23.2071 16.4571L21.7929 15.0429Z" fill="#808080" />
                    </svg>
                </div>
            </div>)
    }

    renderRightButton() {
        if (this.state.index >= this.props.imageUrls.length - 1)
            return null;
        else
            return (<div className="img-cr-buttons img-cr-button-right">
                <div onClick={() => this.next()}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" fill="white" />
                        <path d="M9 14.75C8.44772 14.75 8 15.1977 8 15.75C8 16.3023 8.44772 16.75 9 16.75V14.75ZM22.5 15.75L23.2071 16.4571C23.5976 16.0666 23.5976 15.4334 23.2071 15.0429L22.5 15.75ZM16.4571 8.29289C16.0666 7.90237 15.4334 7.90237 15.0429 8.29289C14.6524 8.68342 14.6524 9.31658 15.0429 9.70711L16.4571 8.29289ZM15.0429 21.7929C14.6524 22.1834 14.6524 22.8166 15.0429 23.2071C15.4334 23.5976 16.0666 23.5976 16.4571 23.2071L15.0429 21.7929ZM9 16.75H22.5V14.75H9V16.75ZM23.2071 15.0429L16.4571 8.29289L15.0429 9.70711L21.7929 16.4571L23.2071 15.0429ZM21.7929 15.0429L15.0429 21.7929L16.4571 23.2071L23.2071 16.4571L21.7929 15.0429Z" fill="#808080" />
                    </svg>
                </div>
            </div>)

    }

    rednerButtons() {
        return (
            <div>
                {this.renderLeftButton()}
                {this.renderRightButton()}
            </div>
        )
    }

    bulletOpacity(i: number): number {
        let index = this.state.index;
        let len = this.props.imageUrls.length;
        let abs = Math.abs(index - i);
        if (i == index)
            return 1.0;
        if (len < 7)
            return 0.6;
        else if (abs < 3)
            return 0.6;
        return 0.3
    }

    bulletsCount(): number {
        return this.props.imageUrls.length > 7 ? 7 : this.props.imageUrls.length;
    }
    mapBulletIndex(i: number): number {
        let index = this.state.index;
        let len = this.props.imageUrls.length;
        if (index > 3 && index < len - 3) {
            return i + index - 3;
        }
        else if (index >= len - 4) {
            return i + len - this.bulletsCount();
        }
        return i;
    }

    renderControl() {
        if (this.props.renderControl != true)
            return null;
        else
            return (
                <div > {this.rednerButtons()}
                    <div className="img-cr-bullets">

                        {Array.from(Array(this.bulletsCount()).keys())
                            .map(i => this.mapBulletIndex(i)).map(i => <span className="img-cr-bullet"
                                style={{ opacity: this.bulletOpacity(i) }}></span>)} </div>
                </div>
            );
    }

    hasSize(): boolean {
        return this.props.height != undefined && this.props.width != undefined;
    }

    getSize() {
        if (this.hasSize())
            return { height: this.props.height, width: this.props.width }
        return {};
    }

    getContainerStyle() {
        if (this.hasSize())
            return Object.assign({}, { borderRadius: 0 }, {paddingTop:"0"}, this.getSize())
        return {};
    }

    getImageStyle() {
        return Object.assign({}, { animationDirection: this.state.direction }, this.getSize())
    }

    onImageClick() {
        if (this.props.onImageClicked)
            this.props.onImageClicked();
    }

    render() {
        if (this.props.imageUrls?.length == 0)
            return null;
        if (this.state.initial || this.props.imageUrls.length == 1) {
            return (
                <div>
                    <div className="img-cr-container" onClick={() => this.next()} style={this.getContainerStyle()}>
                        <img onClick={() => this.onImageClick()} className={`img-cr-image`} src={this.state.imageUrlA} style={this.getSize()}></img>
                        {this.props.imageUrls.length != 1 ? this.renderControl() : null}
                    </div>
                </div>)
        }

        if (this.state.restart)
            return null;
        else
            return (
                <div>
                    <div className="img-cr-container" style={ this.getContainerStyle()}>
                        <img
                            onClick={() => this.onImageClick()}
                            className={`img-cr-image ${this.state.animA}`}
                            src={this.state.imageUrlA}
                            style={this.getImageStyle()} />

                        <img onClick={() => this.onImageClick()} className={`img-cr-image ${this.state.animB}`} src={this.state.imageUrlB} style={this.getImageStyle()}></img>
                        {this.renderControl()}
                    </div>
                </div>
            )
    }
}

export default ImageCarousel;