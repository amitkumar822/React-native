import {View} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Graphics from '@components/home/Graphics';
import HeaderSection from '@components/home/HeaderSection';
import MainList from '@components/list/MainList';

const DeliveryScreen: FC = () => {
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1]);
    return {
      backgroundColor: `rgba(255,255,255, ${opacity})`,
    };
  });

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
    };
  });

  const moveUpStyleNoExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 50], [0, -50]);

    return {
      transform: [{translateY: translateY}],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={moveUpStyle}>
        <Animated.View style={moveUpStyleNoExtrapolate}>
          <Graphics />
        </Animated.View>

        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>
      </Animated.View>

      <Animated.View style={moveUpStyle}>
        <MainList />
      </Animated.View>
    </View>
  );
};

export default DeliveryScreen;
