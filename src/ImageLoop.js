import React from 'react';

class ImageLoop extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="image-loop">
        <img 
          src={this.props.preview}
          className={
            this.state.count >= this.props.images.length
            ? "preview done"
            : "preview"
          }
        />
        {this.props.images.map((image, index ) => (
          <img
            key={index}
            className={currentImage === index ? "active" : ""}
            src={image}
            onLoad={this.countImages}
          />

        ))}
      </div>
    );
  }
}

export default ImageLoop;
