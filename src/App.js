import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.state = {
      ready: false
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos").then(response => response.json()).then(jsonData => {
      this.images = jsonData.slice(0, 3);
      this.setState({ready: true});
    });
  }
  slide = (direction) => {
    const currentPosition = +this.slider.style.marginLeft.slice(0, -2);
    console.log(this.slider.offsetWidth, window.innerWidth, currentPosition);
    if (!(currentPosition === 0 && direction === "right") || !(-currentPosition > (this.slider.offsetWidth - window.innerWidth - 67.58) && direction === "left")) {
      this.slider.style.marginLeft = direction === "right" ? currentPosition + 300 + "px" : currentPosition - 300 + "px";
    } 
  }
  render() {
    return (
      <div style={styles.container}>
        {
          this.state.ready ? (
            <>
              <button style={styles.button} onClick={e => this.slide("right")}>left</button>
              <div style={styles.slider} ref={element => this.slider = element}>
                {
                  this.images.map(image => <img key={image.id} alt={image.title} src={image.url} />)
                }
              </div>
              <button style={styles.button} onClick={e => this.slide("left")}>right</button>
            </>
          ) : "Getting images from the server..."
        }
      </div>
    );
  }
}
export default App;
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center"
  },
  slider: {
    display: "flex",
    overflow: "hidden",
    marginLeft: 0,
    transition: "margin 0.3s ease-out"
  },
  button: {
    height: "100%",
    zIndex: 1
  }
}