import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Container,
  // CircleContainer,
  // CircleView,
  CircleButton,
} from "./components/styles";
import { LinearGradient } from 'expo-linear-gradient';
import colors from './assets/colors/color'
const CIRCLE_SIZE = 100;

const onBoard1 = ['#2B8FE3']
const onBoard2 = ['#EA3690']

const Circle = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1]
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#2B8FE3', '#2B8FE3', '#2B8FE3', '#EA3690', '#EA3690']
  })
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#EA3690', '#EA3690', '#EA3690', '#2B8FE3', '#2B8FE3']
  })
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.CircleContainer, {
      backgroundColor: containerBg
    },]} >
      <Animated.View
        style={[
          styles.CircleView,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                })
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                })
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 5, 0],
                  // outputRange: ['0%', '50%', '0%'],
                }),
              },

            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress} >
          <CircleButton>
            <AntDesign name="arrowright" size={28} color="white" />
          </CircleButton>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animation = (toValue) => Animated.timing(animatedValue, {
    toValue,
    duration: 3000,
    useNativeDriver: false
  })
  const [index, setIndex] = React.useState(0)
  const onPress = () => {
    setIndex(index === 1 ? 0 : 1)
    animation(index === 1 ? 0 : 1).start();
    // Animated.timing(animatedValue, {
    //   toValue: 1,
    //   duration: 3000,
    //   useNativeDriver: false,
    // }).start();
  }
  return (
    <Container>
      <StatusBar style="auto" hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </Container>
  );
}

const styles = StyleSheet.create({
  CircleView: {
    // backgroundColor: colors.screenTwo,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  CircleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    // backgroundColor: colors.screenOne,
  }
})