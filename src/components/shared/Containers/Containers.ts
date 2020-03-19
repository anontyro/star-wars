import styled from 'styled-components';

export const PersonContainer = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  justify-self: center;
  height: 250px;
  width: 90%;
  text-align: center;
  border: 3px solid gold;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 4px 3px 20px black;
  background-color: #0a2748;
  margin: auto;
  :hover {
    opacity: 0.5;
  }
  .next-page-card-body > h1 {
    font-size: 2em;
  }
`;

export const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
`;
