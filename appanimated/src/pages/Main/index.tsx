import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import User from '../../components/User';

import { Container, Header } from './styles';

const { width } = Dimensions.get('window');

const userList = [
  {
    id: 1,
    name: 'Alan Andrade',
    description: 'Head de programação!',
    avatar: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
    likes: 200,
    color: '#57BCBC',
  },
  {
    id: 2,
    name: 'Felipe Brandão',
    description: 'Head de empreendedorismo!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80',
    likes: 350,
    color: '#E75A63',
  },
  {
    id: 3,
    name: 'Gelses Coutinho',
    description: 'Head de mindset!',
    avatar: 'https://avatars0.githubusercontent.com/u/4669899?s=460&v=4',
    thumbnail:
      'https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80',
    likes: 250,
    color: '#2E93E5',
  },
  {
    id: 4,
    name: 'Gabriel Barbosa',
    description: 'Head de marketing!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail: 'https://api.adorable.io/avatars/400/gabigol.png',
    likes: 260,
    color: '#e3a600',
  },
  {
    id: 5,
    name: 'Linus T.',
    description: 'Head de design!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail: 'https://api.adorable.io/avatars/400/linus.png',
    likes: 120,
    color: '#8100e3',
  },
  {
    id: 6,
    name: 'Steve Jobs',
    description: 'Head de infra!',
    avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
    thumbnail: 'https://api.adorable.io/avatars/400/apple.png',
    likes: 250,
    color: '#50a318',
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

  const scrollOffset = useRef(new Animated.Value(0)).current;
  const listProgress = useRef(new Animated.Value(0)).current;
  const userInfoProgress = useRef(new Animated.Value(0)).current;

  const [users, setUsers] = useState<IUser[]>(userList);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  const handleGoBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }, [navigation]);

  const handleSelectUser = useCallback(
    (user) => {
      setUserSelected(user);

      scrollOffset.setValue(0);

      Animated.sequence([
        Animated.timing(listProgress, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }),

        Animated.timing(userInfoProgress, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setUserInfoVisible(true);
      });
    },
    [listProgress, scrollOffset, userInfoProgress],
  );

  return (
    <Container>
      <Animated.View
        style={{
          height: scrollOffset.interpolate({
            inputRange: [0, 140],
            outputRange: [200, 70],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Header>
          <Animated.Image
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            }}
            source={{ uri: userSelected?.thumbnail }}
          />
          <Animated.Text
            style={[
              styles.headerText,
              {
                fontSize: scrollOffset.interpolate({
                  inputRange: [120, 140],
                  outputRange: [24, 16],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateX: userInfoProgress.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, width],
                    }),
                  },
                ],
              },
            ]}
          >
            App Animated
          </Animated.Text>

          <Animated.Text
            style={[
              styles.headerText,
              {
                transform: [
                  {
                    translateX: userInfoProgress.interpolate({
                      inputRange: [0, 100],
                      outputRange: [-width, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {userSelected?.name}
          </Animated.Text>
        </Header>
      </Animated.View>

      {(userInfoVisible && (
        <View>
          <User user={userSelected} onPress={handleGoBack} />
        </View>
      )) || (
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: listProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, width],
                }),
              },
            ],
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollOffset },
                  },
                },
              ],
              {
                useNativeDriver: false,
              },
            )}
          >
            {users.map((user) => (
              <User
                key={user.id}
                user={user}
                onPress={() => handleSelectUser(user)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </Container>
  );
};

export default Main;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});
