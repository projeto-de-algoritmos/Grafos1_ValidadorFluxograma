import React from 'react';
import Slider from './Slider';
import { Tooltip } from '@chakra-ui/react'
import { Wrapper, Title, Card, Subject, Dependencies } from './styles';

function ClassSubjects({data, editDisciplina, onEditDisciplina}) {

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
        {item.dependencies && (
          <>
            <Dependencies>Pré requisitos:</Dependencies>
            {item?.dependencies?.map?.((item) => (
              <Dependencies className='list' key={item.name}>
                {item.name}
              </Dependencies>
            ))}
          </>
        )}
        <button onClick={() => onEditDisciplina(index)}>Editar</button>
      </Card>
      
      ))}
      </Slider>
    </Wrapper>
  );
}

export default ClassSubjects;