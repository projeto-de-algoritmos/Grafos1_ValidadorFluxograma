import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${(props) => (!props.show ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  color: #E88873;
  font-size: 2.056rem;
  font-family: 'Rowdies', cursive;
  font-weight: 400;
  line-height: 100%;
  text-align: center;
`;

export const ContentContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: space-evenly;
  flex-direction: column;
  min-height: 15.278rem;
  min-width: ${(props) => (props.addMargin && '44.556rem')};
  margin-bottom: 2.389rem;
`;

export const ButtonWithIcon = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 0.389rem;
  border: 0.167rem #A37774 solid;
  height: 3.778rem;
  color: #A37774;
  font-size: 1.556rem;
  font-weight: 600;
  padding: 0.667rem 1.667rem;
  line-height: 100%;
  transition: all .3s;

  img {
    margin-left: 0.556rem;
    width: 1.833rem;

    &.listIcon{
      margin-left: 5.156rem;
      width: 1.533rem;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);;
  }
`;

export const SelectContainer = styled.div`
  width: 39rem;
  max-height: 3.733rem;
  margin-bottom: 1.222rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    &::-webkit-scrollbar {
      width: 0.222rem;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: #bababa;
      border-radius: 0.111rem;
    }
  
    &::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

export const InputLabel = styled.p`
  color: #A37774;
  font-size: 1rem;
  margin-bottom: 0.278rem;
  font-weight: 500;
  margin-top: 1.222rem;
`;