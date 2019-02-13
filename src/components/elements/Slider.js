import React from 'react';
import '../../../node_modules/bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css';
import '../../../node_modules/bulma-extensions/bulma-slider/dist/js/bulma-slider';

const Slider = props => (
  <input
    className="slider is-fullwidth"
    step="1"
    min="0"
    max="100"
    type="range"
    {...props}
  />
);

export default Slider;
