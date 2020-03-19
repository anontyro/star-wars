import styled from 'styled-components';
import COLOURS from '../../enum/colours';

const Loading = styled.div`
  content: ' ';
  border: 16px solid black;
  border-top: 16px solid ${COLOURS.MAIN_GOLD};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
