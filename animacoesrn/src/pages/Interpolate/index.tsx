import React, { useEffect, useRef } from 'react';
import { Animated, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Ball } from './styles';

const Interpolate: React.FC = () => {
  const navigation = useNavigation();

  const ballY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    function animate() {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ballY, {
            toValue: 500,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]),
        {
          iterations: 3,
        },
      ).start();
    }

    animate();
  }, [ballY]);

  return (
    <Container>
      <Animated.View
        style={{
          flex: 1,
          top: ballY,
          opacity: ballY.interpolate({
            inputRange: [0, 75, 150, 225, 300, 375],
            outputRange: [1, 1, 0.3, 1, 0.3, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Ball />
      </Animated.View>

      <Button title="SPRING" onPress={() => navigation.navigate('Spring')} />
      <Button title="DECAY" onPress={() => navigation.navigate('Decay')} />
      <Button title="TIMING" onPress={() => navigation.navigate('Timing')} />
      <Button title="TWO AXIS" onPress={() => navigation.navigate('TwoAxis')} />
      <Button
        title="PAN RESPONDING"
        onPress={() => navigation.navigate('PanResponding')}
      />
    </Container>
  );
};

export default Interpolate;
