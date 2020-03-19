import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import COLOURS from '../../enum/colours';

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const externalLink = (url: string) => {
  window.open(url, '_blank');
};

const SocialIcon = styled.div`
  cursor: pointer;
  font-size: 42px;
  width: 36px;
  margin: 0 5px;
  :hover {
    color: ${COLOURS.MAIN_GOLD};
  }
`;

interface SocialProps {
  icon: FontAwesomeIconProps['icon'];
  url: string;
}
const SocialLink: React.FC<SocialProps> = ({ icon, url }) => (
  <SocialIcon onClick={() => externalLink(url)}>
    <FontAwesomeIcon icon={icon} />
  </SocialIcon>
);

export default SocialLink;
