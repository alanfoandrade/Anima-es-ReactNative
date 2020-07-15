import React, { useEffect, useRef } from 'react';
import { Animated, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Ball } from './styles';

const Timing: React.FC = () => {
  const navigation = useNavigation();

  const ballX = useRef(new Animated.Value(0)).current;
  const ballY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    function animate() {
      Animated.loop(
        // SEQUENCE
        Animated.sequence([
          Animated.timing(ballY, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false,
          }),

          Animated.delay(1000),

          // Animated.timing(ballX, {
          //   toValue: 200,
          //   duration: 1000,
          //   useNativeDriver: false,
          // }),

          // Animated.delay(1000),

          // Animated.timing(ballY, {
          //   toValue: 0,
          //   duration: 1000,
          //   useNativeDriver: false,
          // }),

          // Animated.delay(1000),

          // Animated.timing(ballX, {
          //   toValue: 0,
          //   duration: 1000,
          //   useNativeDriver: false,
          // }),

          // Animated.delay(1000),

          // // STAGGER
          // Animated.stagger(200, [
          //   Animated.timing(ballY, {
          //     toValue: 200,
          //     duration: 1000,
          //     useNativeDriver: false,
          //   }),

          //   Animated.timing(ballX, {
          //     toValue: 200,
          //     duration: 1000,
          //     useNativeDriver: false,
          //   }),
          // ]),

          // Animated.delay(1000),

          // // PARALLEL
          // Animated.parallel([
          //   Animated.timing(ballY, {
          //     toValue: 300,
          //     duration: 1000,
          //     useNativeDriver: false,
          //   }),
          //   Animated.timing(ballX, {
          //     toValue: 300,
          //     duration: 1000,
          //     useNativeDriver: false,
          //   }),
          // ]),
        ]),
        {
          iterations: 3,
        },
      ).start();
    }

    animate();
  }, [ballX, ballY]);

  return (
    <Container>
      <Animated.View style={{ flex: 1, top: ballY, left: ballX }}>
        <Ball />
      </Animated.View>

      <Button title="SPRING" onPress={() => navigation.navigate('Spring')} />
      <Button title="DECAY" onPress={() => navigation.navigate('Decay')} />
      <Button title="TWO AXIS" onPress={() => navigation.navigate('TwoAxis')} />
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

export default Timing;
