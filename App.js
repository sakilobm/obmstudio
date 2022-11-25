import * as React from 'react';
import {useCallback} from 'react';
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
// Rest of the import statements
import {useFonts} from 'expo-font';
import Constants from 'expo-constants';
import {AntDesign} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import {LinearGradient} from 'expo-linear-gradient';
import Circle from './components/Circle';
import Onboard from './components/Onboard';
const {width} = Dimensions.get('window');

// const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const quotes = [
  {
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt',
    author: 'Author sakil',
    src: require('./assets/images/Frame.png'),
    width: 100,
    height: 100,
  },
  {
    quote: 'The fastest way to build an app.',
    author: 'The Expo Team',
    src: require('./assets/images/1-Small.png'),
    width: 100,
    height: 100,
  },
  {
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
    src: require('./assets/images/2.png'),
    width: 100,
    height: 100,
  },
  {
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    src: require('./assets/images/3.png'),
    width: 100,
    height: 100,
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: 'Steve Jobs',
    src: require('./assets/images/4.png'),
    width: 100,
    height: 100,
  },
  {
    quote: 'WELCOME',
    author: 'SakilSowbharath',
    src: require('./assets/images/2.png'),
    width: 100,
    height: 100,
  },
  {
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey',
    src: require('./assets/images/3.png'),
    width: 100,
    height: 100,
  },
  {
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron',
    src: require('./assets/images/4.png'),
    width: 100,
    height: 100,
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon',
    src: require('./assets/images/1.png'),
    width: 100,
    height: 100,
  },
];

/* 
initialBgColor -> Big background of the element
bgColor -> initial circle bg color that will be the next slide initial BG Color
nextBgColor -> next circle bg color after we fully transition the circle and this will be small again
prev bgColor === next initialBgColor
prev nextBgColor === next bgColor
*/

const colors = [
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: '#222',
  },
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: 'yellowgreen',
  },
  {
    initialBgColor: '#222',
    bgColor: 'yellowgreen',
    nextBgColor: 'midnightblue',
  },
  {
    initialBgColor: 'yellowgreen',
    bgColor: 'midnightblue',
    nextBgColor: 'turquoise',
  },
  {
    initialBgColor: 'midnightblue',
    bgColor: 'turquoise',
    nextBgColor: 'goldenrod',
  },
  {
    initialBgColor: 'turquoise',
    bgColor: 'goldenrod',
    nextBgColor: '#222',
  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Menlo: require('./assets/fonts/DMSans-Medium.ttf'),
    RubikMonoOne: require('./assets/fonts/RubikMonoOne-Regular.ttf'),
  });
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(quotes.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // Main Screen Rendered Here
    <View
      style={{flex: 1, justifyContent: 'flex-start', paddingTop: 100}}
      onLayout={onLayoutRootView}>
      {/* <StatusBar hidden /> */}
      <Circle
        index={index}
        onPress={onPress}
        quotes={quotes}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              (i) => i / 2,
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0,
            ),
          }),
        }}>
        {quotes.slice(0, colors.length).map(({quote, author, src}, i) => {
          return (
            <View style={{paddingRight: width, width: width * 2}} key={i}>
              <Text style={[styles.paragraph, {color: colors[i].nextBgColor}]}>
                {quote}
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {
                    color: colors[i].nextBgColor,
                    fontSize: 10,
                    fontWeight: 'normal',
                    textAlign: 'right',
                    opacity: 0.8,
                  },
                ]}>
                ______ {author}
              </Text>
              <View>
                <ImageBackground
                  style={[styles.onboard]}
                  source={src}></ImageBackground>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Menlo',
    color: 'white',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboard: {
    position: 'absolute',
    top: '80%',
    left: '8%',
    width: 210,
    height: 180,
  },
  // circle: {
  //     backgroundColor: 'turquoise',
  //     width: 80,
  //     height: 80,
  //     borderRadius: 50,
  // },
});
