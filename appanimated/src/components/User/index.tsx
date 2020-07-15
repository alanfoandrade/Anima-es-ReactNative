import React, { useEffect, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Thumbnail,
  InfoContainer,
  BioContainer,
  Name,
  Description,
  LikeContainer,
  Likes,
} from './styles';

const { width } = Dimensions.get('window');

interface IUser {
  id: number;
  name: string;
  description: string;
  avatar: string;
  thumbnail?: string;
  likes: number;
  color: string;
}

interface IUserProps {
  user: IUser | null;
  onPress(): void;
}

const User: React.FC<IUserProps> = ({ user, onPress }) => {
  const offset = useRef(new Animated.ValueXY({ x: 0, y: 50 })).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: offset.x,
          },
        ],
        {
          useNativeDriver: false,
        },
      ),

      onPanResponderRelease: () => {
        if (Object.values(offset)[2]._value < -width * 0.75)
          Alert.alert('Deleted!!');

        Animated.spring(offset.x, {
          toValue: 0,
          bounciness: 20,
          useNativeDriver: false,
        }).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(offset.x, {
          toValue: 0,
          bounciness: 20,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    function animate() {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 5,
          bounciness: 20,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }

    animate();
  }, [offset.y, opacity]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [
          ...offset.getTranslateTransform(),
          {
            rotateZ: offset.x.interpolate({
              inputRange: [-width, width],
              outputRange: ['-50deg', '50deg'],
            }),
          },
        ],
        opacity,
      }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <Container>
          <Thumbnail source={{ uri: user?.thumbnail }} />

          <InfoContainer style={{ backgroundColor: user?.color }}>
            <BioContainer>
              <Name>{user?.name.toUpperCase()}</Name>
              <Description>{user?.description}</Description>
            </BioContainer>
            <LikeContainer>
              <Icon name="heart" size={12} color="#FFF" />
              <Likes>{user?.likes}</Likes>
            </LikeContainer>
          </InfoContainer>
        </Container>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default User;
