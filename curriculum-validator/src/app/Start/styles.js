import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${(props) => (!props.show ? 'none' : '')};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 0.389rem;
  border: 0.167rem #E88873 solid;
  height: 3.778rem;
  margin-bottom: 2.167rem;
  color: #E88873;
  font-size: 2.056rem;
  font-family: Rowdies;
  font-weight: 400;
  padding: 0.667rem 1.667rem;
  line-height: 100%;
  transition: all .3s;

  img {
    margin-left: 0.556rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);;
  }
`;

export const InputContainer = styled.div`
  width: 22.033rem;
  display: ${(props) => (!props.show ? 'none' : '')};
`;

export const InputLabel = styled.p`
  color: #A37774;
  font-size: 1rem;
  margin-bottom: 0.278rem;
  font-weight: 500;
`;
