import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 15px 0;
  border-radius: 10px;
  flex-direction: column;
`;

export const Thumbnail = styled.Image`
  width: 100%;
  height: 150px;
`;

export const InfoContainer = styled.View`
  background: #57bcbc;
  flex-direction: row;
  align-items: center;
  padding: 8px 15px;
`;

export const BioContainer = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 10px;
`;

export const Description = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-top: 2px;
`;

export const LikeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px 8px;
  border-radius: 20px;
`;

export const Likes = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
`;
