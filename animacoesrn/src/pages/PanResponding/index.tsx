import React, { useRef } from 'react';
import { Animated, PanResponder, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Ball } from './styles';

const PanResponding: React.FC = () => {
  const navigation = useNavigation();

  const ballPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        ballPosition.setOffset({
          x: Object.values(ballPosition)[2]._value,
          y: Object.values(ballPosition)[3]._value,
        });

        ballPosition.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: ballPosition.x,
            dy: ballPosition.y,
          },
        ],
        {
          useNativeDriver: false,
        },
      ),

      onPanResponderRelease: () => [ballPosition.flattenOffset()],
    }),
  ).current;

  return (
    <Container>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          flex: 1,
          transform: [
            { translateX: ballPosition.x },
            { translateY: ballPosition.y },
          ],
        }}
      >
        <Ball />
      </Animated.View>

      <Button title="SPRING" onPress={() => navigation.navigate('Spring')} />
      <Button title="DECAY" onPress={() => navigation.navigate('Decay')} />
      <Button title="TIMING" onPress={() => navigation.navigate('Timing')} />
      <Button title="TWO AXIS" onPress={() => navigation.navigate('TwoAxis')} />
      <Button
        title="INTERPOLATE"
        onPress={() => navigation.navigate('Interpolate')}
      />
    </Container>
  );
};

export default PanResponding;
