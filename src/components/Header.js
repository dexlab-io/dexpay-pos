import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

export default () => (
  <Container className="section">
    <div className="container is-fluid">
      <a className="button icon">
        <i className="fas fa-bars" />
      </a>
      <h3 className="title">Header title here</h3>
    </div>
  </Container>
);
