import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotateOne = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
`

const rotateTwo = keyframes`
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
`

const rotateThree = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  perspective: 800px;

  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .one {
    border-bottom: 3px solid #EFEFFA;
    animation: ${rotateOne} 1s linear infinite;
  }

  .two {
    border-right: 3px solid #EFEFFA;
    animation: ${rotateTwo} 1s linear infinite;
  }

  .three {
    border-top: 3px solid #EFEFFA;
    animation: ${rotateThree} 1s linear infinite;
  }
`

const LoadingComponent = () => (
  <Loader>
    <div className="inner one"></div>
    <div className="inner two"></div>
    <div className="inner three"></div>
  </Loader>
)

export default LoadingComponent;


