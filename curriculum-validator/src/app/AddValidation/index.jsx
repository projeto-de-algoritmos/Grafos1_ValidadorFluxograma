import { useState } from 'react';
import AddIcon from '../../assets/add-icon.svg'
import ListItem from '../../assets/list-icon.svg'
import ClassSubjects from './ClassSubjects';
import { 
  Wrapper, Title, ContentContainer, ButtonWithIcon, SelectContainer, InputLabel
} from './styles';
import {  Input, Checkbox, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'

function AddValidation({show, curriculumName}) {
  const [showFields, setShowFields] = useState(true);

  const curriculum = [{
    name: "Algoritmos e Programação de Computadores",
    degree: 1,
  }, {
    name: "Algoritmos e Programação de Computadores",
    degree: 1,
    dependencies: [{
        name: "OO",
        index: 1
    },{
      name: "Testes",
      index: 1
    }]
  }, {
    name: "Algoritmos e Programação de Computadores",
    degree: 1,
    dependencies: [{
        name: "OO",
        index: 1
    },{
      name: "Testes",
      index: 1
    }]
    },{
      name: "Algoritmos e Programação de Computadores",
      degree: 1,
      dependencies: [{
          name: "OO",
          index: 1
      }]
    },{
      name: "Algoritmos e Programação de Computadores",
      degree: 1,
      dependencies: [{
          name: "OO",
          index: 1
      }]
    },{
      name: "Algoritmos e Programação de Computadores",
      degree: 1,
      dependencies: [{
          name: "OO",
          index: 1
      }]
    }
  ]

  return (
    <Wrapper show={show}>
       <Title>{curriculumName || 'Grade curricular'}</Title>
       <ContentContainer show={!showFields}>
        <ButtonWithIcon>
          Adicionar Disciplina
          <span><img src={AddIcon} alt="Ícone" /></span>
        </ButtonWithIcon>
        {(curriculum.length > 1) && (
          <ButtonWithIcon>
            Validar Grade
            <span><img class='listIcon' src={ListItem} alt="Ícone" /></span>
          </ButtonWithIcon>
        )}
       </ContentContainer>
       <ContentContainer show={showFields} addMargin>
          <InputLabel>Nome da disciplina</InputLabel>
            <Input
              required
              value={curriculumName}  
              placeholder='Nome'
              color='#A37774'
              _placeholder={{ color: '#A37774' }}
              focusBorderColor='#E88873'
              variant='filled'
              size='md'
            />
          <InputLabel>Selecionar pré-requisitos</InputLabel>
        <SelectContainer>
          <>
          {curriculum?.map?.((item, index) => (
            <Checkbox colorScheme='orange' value={item.name}>{item.name}</Checkbox>
          ))}
          </>
        </SelectContainer>
        <Button color='#A37774' bg='#EADEDA' border='2px' borderColor='#A37774' width='9rem' size='sm'>Adicionar Disciplina</Button>
       </ContentContainer>
        <ClassSubjects curriculum={curriculum}/>
    </Wrapper>
  );
}

export default AddValidation;
