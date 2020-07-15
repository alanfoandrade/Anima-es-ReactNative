import React, { useEffect, useRef } from 'react';
import { Animated, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Ball } from './styles';

const Spring: React.FC = () => {
  const navigation = useNavigation();

  const ballY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    function animate() {
      Animated.loop(
        // SEQUENCE
        Animated.sequence([
          Animated.spring(ballY, {
            toValue: 200,
            bounciness: 25,
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
      <Animated.View style={{ flex: 1, top: ballY }}>
        <Ball />
      </Animated.View>

      <Button title="TWO AXIS" onPress={() => navigation.navigate('TwoAxis')} />
      <Button title="DECAY" onPress={() => navigation.navigate('Decay')} />
      <Button title="TIMING" onPress={() => navigation.navigate('Timing')} />
      <Button
        title="INTERPOLATE"
        onPress={() => navigation.navigate('Interpolate')}
      />
      <Button
        title="PAN RESPONDING"
        onPress={() => navigation.navigate('PanResponding')}
      />
    </Container>
  );
};

export default Spring;
