import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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

const User: React.FC<IUserProps> = ({ user }) => {
  return (
    <TouchableWithoutFeedback>
      <Container>
        <Thumbnail source={{ uri: user?.thumbnail }} />

        <InfoContainer>
          <BioContainer>
            <Name />
            <Description />
          </BioContainer>
          <LikeContainer>
            <Icon name="heart" size={12} color="#FFF" />
            <Likes />
          </LikeContainer>
        </InfoContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default User;
