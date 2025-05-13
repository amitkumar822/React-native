import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';
import { resetAndNavigate } from '@utils/NavigationUtils';

const SplashScreen: FC = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('LoginScreen')
    }, 3000);
    return () => clearTimeout(timeoutId)
  }, [])

  const {styles} = useStyles(splashStyles);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.logoImage}
      />

      <Animated.View
        style={styles.animatedContainer}
        entering={FadeInDown.delay(400).duration(800)}>
        <Image
          source={require('@assets/images/tree.png')}
          style={styles.treeImage}
        />
        
        <CustomText
          variant="h5"
          style={styles.msgText}
          fontFamily="Okra-Medium"
          color="#fff"
          >
          From Kitchen to doorstep, Your cravings, delivered!
        </CustomText>

      </Animated.View>
    </View>
  );
};

export default SplashScreen;
