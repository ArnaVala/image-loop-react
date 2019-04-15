import React from "react";
import styled from "styled-components";


const Loop = styled.div`
  position: relative;
  display: flex;
  margin: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    width: 90%;
    height: auto;
    max-width: 675px;
    object-fit: cover;
    opacity: 0;
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.2);


    &.active {
      opacity: 1;
    }

    &.preview {
      opacity: 1;
      z-index: 2;

      &.done {
        opacity: 0;
      }
    }
  }
`;

class ImageLoop extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      count: 0
    };
  }

  componentDidMount() {
    this.startLooping();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startLooping = () => {
    this.interval = setInterval(() => {
      if (this.state.currentImage < this.props.images.length - 1) {
        this.setState(state => ({ currentImage: state.currentImage + 1 }));
      } else {
        this.setState(state => ({ currentImage: 0 }));
      }
    }, this.props.speed);
  };

  countImages = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  render() {
    const { currentImage } = this.state;

    return (
      <>
        <Loop>
          <h1 className="app__name">Image Loop React Component</h1>
          <img
            src={this.props.preview}
            alt={" "}
            className={
              this.state.count >= this.props.images.length
                ? "preview done"
                : "preview"
            }
          />
          {this.props.images.map((image, index) => (
            <img
              key={index}
              className={currentImage === index ? "active" : ""}
              src={image}
              onLoad={this.countImages}
              alt={""}
            />
          ))}
        </Loop>
      </>
    );
  }
}

export default ImageLoop;
