import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMSansMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

