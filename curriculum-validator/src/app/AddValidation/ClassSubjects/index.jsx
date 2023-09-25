import React from 'react';
import Slider from './Slider';
import { Tooltip } from '@chakra-ui/react'
import { Wrapper, Title, Card, Subject, Dependencies, ButtonContainer } from './styles';
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

function ClassSubjects({data, handleExcluirDisciplina, onEditDisciplina}) {

  console.log(data);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1
  };

  const renderText = (text) => {
    if (text.length <= 30) {
      return text;
    }

    const smallerText = text.slice(0, 30);

    return (
      <>
        <span>{smallerText}</span>
        <span>
          ...
          <br />
        </span>
      </>
    );
  };

  return (
    <Wrapper>
      <Title>Disciplinas Criadas</Title>
      <Slider {...settings}>   
      {data?.map?.((item, index) => ( 
        <Card>
        <Tooltip placement='top' hasArrow label={item?.name} bg='#252422'>
          <Subject>{renderText(item?.name)}</Subject>
        </Tooltip>
        {item?.dependenciaDe?.length > 0 && (
          <>
            <Dependencies>Pré requisitos:</Dependencies>
            {item?.dependenciaDe?.map?.((item) => (
              <Dependencies className='list' key={item.name}>
                {item.name}
              </Dependencies>
            ))}
          </>
        )}
        <ButtonContainer>
        </ButtonContainer>
      </Card>
      
      ))}
      </Slider>
    </Wrapper>
  );
}

export default ClassSubjects;