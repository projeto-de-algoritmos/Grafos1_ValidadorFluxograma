import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45.111rem;
`;

export const Title = styled.p`
  color: #A37774;
  font-size: 1.333rem;
  text-transform: uppercase;
  font-weight: 500;
  font-family: 'Amaranth', sans-serif;
  border-bottom: 0.111rem #A37774 solid;
`;

export const Card = styled.div`
  height: 8.922rem;
  width: 21.556rem;
  background-color: #A37774;
  border-radius: 0.444rem;
  margin-top: 1.111rem;
  padding: 1rem 1.778rem;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar {
    width: 0.222rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5c4240;
    border-radius: 0.111rem;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const Subject = styled.p`
  color: #FFFFFF;
  font-size: 1.222rem;
  font-family: 'Amaranth', sans-serif;
  margin-bottom: 1.111rem;
`;

export const Dependencies = styled.p`
  color: #FFFFFF;
  font-size: 0.889rem;
  font-family: 'Mooli', sans-serif;

  &.list{
    color: #EADEDA;
    font-size: 0.789rem;
  }
`;