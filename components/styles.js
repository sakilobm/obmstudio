import styled from "styled-components/native";
import React from 'react'
import {Animated} from 'react-native'

const CIRCLE_SIZE = 100;

export const Container = styled.View`
flex: 1;
justify-content: flex-start;
`;

export const CircleContainer = styled.View`
flex: 1;
justify-content: flex-end;
align-items: center;
padding: 8px;
padding-bottom: 100px;
background-color: #ffd700;
`;

export const CircleView = styled(Animated.View)`
background-color: #444;
width: ${CIRCLE_SIZE};
height: ${CIRCLE_SIZE};
border-radius: ${CIRCLE_SIZE / 2};
`;


export const CircleButton = styled.View`
align-items: center;
padding: 35px;

`;



