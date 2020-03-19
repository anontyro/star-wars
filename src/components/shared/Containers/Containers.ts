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
  background-color: rgb(10, 39, 72, 0.7);
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

export const PageCentreRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
`;

export const PageCentreColumnContainer = styled(PageCentreRowContainer)`
  flex-direction: column;
`;

export const MainBodyContainer = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  min-width: 300px;
  min-height: 200px;
  overflow-y: auto;
`;
