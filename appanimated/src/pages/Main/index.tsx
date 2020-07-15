import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import User from '../../components/User';

import { Container, Header, HeaderImage, HeaderText } from './styles';

const { width } = Dimensions.get('window');

const userList = [
  {
    id: 1,
    name: 'Diego Fernandes',
    description: 'Head de programação!',
    avatar: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
    likes: 200,
    color: '#57BCBC',
  },
  {
    id: 2,
    name: 'Robson Marques',
    description: 'Head de empreendedorismo!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
    likes: 350,
    color: '#E75A63',
  },
  {
    id: 3,
    name: 'Cleiton Souza',
    description: 'Head de mindset!',
    avatar: 'https://avatars0.githubusercontent.com/u/4669899?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80',
    likes: 250,
    color: '#2E93E5',
  },
  {
    id: 4,
    name: 'Robson Marques',
    description: 'Head de empreendedorismo!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
    likes: 350,
    color: '#E75A63',
  },
];

interface IUser {
  id: number;
  name: string;
  description: string;
  avatar: string;
  thumbnail?: string;
  likes: number;
  color: string;
}

const Main: React.FC = () => {
  const navigation = useNavigation();

  const ballX = useRef(new Animated.Value(0)).current;
  const ballY = useRef(new Animated.Value(0)).current;

  const [userSelected, setUserSelected] = useState<IUser | null>(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [users, setUsers] = useState<IUser[]>(userList);

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

  const handleSelectUser = useCallback((user) => {
    setUserSelected(user);
    setUserInfoVisible(true);
  }, []);

  const handleButtonPress = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);

  const renderDetail = useCallback(
    () => (
      <View>
        <User user={userSelected} onPress={handleButtonPress} />
      </View>
    ),
    [handleButtonPress, userSelected],
  );

  const renderList = useCallback(
    () => (
      <Container>
        <ScrollView>
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              onPress={() => handleSelectUser(user)}
            />
          ))}
        </ScrollView>
      </Container>
    ),
    [handleSelectUser, users],
  );

  return (
    <Container>
      <Header>
        <HeaderImage
          style={{ ...StyleSheet.absoluteFillObject }}
          source={{ uri: userSelected?.thumbnail }}
        />
        <HeaderText>{userSelected?.name || 'GoNative'}</HeaderText>
      </Header>

      {(userInfoVisible && renderDetail()) || renderList()}
    </Container>
  );
};

export default Main;
