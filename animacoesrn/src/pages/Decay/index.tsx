import React, { useRef, useEffect } from 'react';
import { Animated, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Ball } from './styles';

const Decay: React.FC = () => {
  const navigation = useNavigation();

  const ballY = useRef(new Animated.Value(0)).current;
  const ballX = useRef(Animated.divide(ballY, 2)).current;

  useEffect(() => {
    function animate() {
      Animated.decay(ballY, {
        velocity: 0.5,
        useNativeDriver: false,
      }).start();
    }

    animate();
  }, [ballY]);

  return (
    <Container>
      <Animated.View style={{ flex: 1, top: ballY, left: ballX }}>
        <Ball />
      </Animated.View>

      <Button title="SPRING" onPress={() => navigation.navigate('Spring')} />
      <Button
        title="INTERPOLATE"
        onPress={() => navigation.navigate('Interpolate')}
      />
      <Button title="TIMING" onPress={() => navigation.navigate('Timing')} />
      <Button title="TWO AXIS" onPress={() => navigation.navigate('TwoAxis')} />
      <Button
        title="PAN RESPONDING"
        onPress={() => navigation.navigate('PanResponding')}
      />
    </Container>
  );
};

export default Decay;
