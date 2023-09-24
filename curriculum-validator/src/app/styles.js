import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3.056rem 3.056rem 0.667rem;
`;

export const ContentWrapper = styled.div`
  max-width: 25.289rem;
`;

export const Title = styled.h1`
  color: #E88873;
  font-size: 3.5rem;
  font-family: 'Rowdies', cursive;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 100%;
  margin-bottom: 0.556rem;

  span {
    font-size: 4.111rem;
  }
`;

export const Subtitle = styled.p`
  color: #E88873;
  font-size: 2.056rem;
  font-family: 'Rowdies', cursive;
  font-weight: 400;
  line-height: 100%;
  margin-bottom: 3.889rem;
`;

export const Description = styled.p`
  color: #FFFFFF;
  font-size: 1.222rem;
  font-family: 'Mooli', sans-serif;
  font-weight: 400;
  line-height: 150%;
  text-align: justify;
  text-justify: inter-word;
`;

export const ValidationContainer = styled.div`
  background: #EADEDA;
  border-radius: 1.667rem;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 51.278rem;
  min-height: 37.889rem;
  padding: 2.056rem 3.056rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UnderpageText = styled.p`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'Amaranth', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 1.111rem;
`;