import React, { Component } from "react";
import { Power2, TimelineLite } from "gsap";

import logo from "./logo.svg";
import volumeOff from "./volume_off.svg";
import volumeOn from "./volume_on.svg";
import "./Wishes.css";

class Wishes extends Component {
  constructor(props) {
    super(props);

    this.intro = React.createRef();
    this.logo = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
      muted: true
    };
  }

  onVolumeClick = () => {
    if (this.state.muted) {
      this.audio.current.muted = false;
    } else {
      this.audio.current.muted = true;
    }

    this.setState({ muted: !this.state.muted });
  };

  componentDidMount() {
    const tl = new TimelineLite();
  
    tl
      .to(this.intro.current, 4.5, { opacity: 1, delay: 1 })
      .to(this.intro.current, 1.5, {
        opacity: 0,
        onComplete: () => {
          // Check if the document has user interaction
          if (document.visibilityState === 'visible') {
            this.audio.current.play();
          } else {
            // If not, listen for the next user click to start audio
            document.addEventListener('click', () => {
              this.audio.current.play();
            }, { once: true });
          }
        }
      })
      .set(this.logo.current, {
        opacity: 1,
        scale: 2.75,
        delay: 0.5
      })
      .to(this.logo.current, 8, { scale: 0.05, ease: Power2.easeOut })
      .to(this.logo.current, 1.5, { opacity: 0 }, "-=1.5")
      .to(this.content.current, 200, { top: "-170%" });
  }

  render() {
    return (
      <div className="container">
        <section className="intro" ref={this.intro}>
          <p>
            A long time ago (25 years LOL!), in a galaxy far,<br /> far away....
          </p>
        </section>
        <section className="logo" ref={this.logo}>
          <img src={logo} alt="Code Wars logo" />
        </section>
        <section className="crawl">
          <div className="content" ref={this.content}>
          <h1 className="title">Episode 25</h1>
      <h2 className="subtitle">THE BIRTHDAY CELEBRATION</h2>
      <p>
        Snehal, a beacon of sweetness and positivity, steps into the enchanting age of 25. On this special day,
        we gather to celebrate her journey, filled with joy, kindness, and amazing accomplishments.
      </p>
      <p>
        Fueled with passion and ambition, Snehal inspires everyone around her. As she embraces this new chapter,
        may it be adorned with endless moments of happiness, success, and fulfillment.
      </p>
      <p>
        Surrounded by friends and well-wishers, Snehal, the amazing person that she is, deserves all the love and
        warmth the universe has to offer. Happy 25th Birthday! May this year be as extraordinary as you are!
      </p>
    </div>
        </section>
        <audio ref={this.audio} muted>
          <source
            type="audio/mpeg"
            src="https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3"
          />
        </audio>
        <button className="volume" type="button" onClick={this.onVolumeClick}>
          {/* Icons created by Agarunov Oktay-Abraham from the Noun Project */}
          {/* https://thenounproject.com/agarunov/ */}
          {this.state.muted ? (
            <img src={volumeOff} alt="Volume is off" />
          ) : (
            <img src={volumeOn} alt="Volume is on" />
          )}
        </button>
      </div>
    );
  }
}

export default Wishes;
