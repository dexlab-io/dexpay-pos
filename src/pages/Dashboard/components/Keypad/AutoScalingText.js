import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: -26px;
  transform-origin: right;
`;

class AutoScalingText extends React.Component {
  state = {
    scale: 1
  };

  componentDidUpdate() {
    const { scale } = this.state;

    const { node } = this;
    const { parentNode } = node;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale) return;

    if (actualScale < 1) {
      this.setState({ scale: actualScale });
    } else if (scale < 1) {
      this.setState({ scale: 1 });
    }
  }

  render() {
    const { scale } = this.state;

    return (
      <Container
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => (this.node = node)}
      >
        {this.props.children}
      </Container>
    );
  }
}

export default AutoScalingText;
