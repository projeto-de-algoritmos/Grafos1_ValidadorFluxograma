import { 
  Wrapper, Button, InputContainer, InputLabel
} from './styles';
import ButtonArrowDown from '../../assets/double-arrow-down.svg'
import { useState } from 'react';
import { InputGroup, InputRightElement, Input, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'

function Start ({showStartValidation, setShowStartValidation, curriculumName, setCurriculumName}) {
  const [showInput, setShowInput] = useState(false);

  return (
    <Wrapper show={showStartValidation}>
      <Button onClick={() => setShowInput(true)}>
        Iniciar Validação
        <span class="icone"><img src={ButtonArrowDown} alt="Ícone" /></span>
      </Button>
      <InputContainer show={showInput}>
        <InputLabel>Dê um nome para sua grade curricular:</InputLabel>
        <InputGroup>
          <Input
            required
            value={curriculumName}
            onChange={(e) => setCurriculumName(e.target.value)}  
            placeholder='Engenharia de Software'
            color='#A37774'
            _placeholder={{ color: '#A37774' }}
            focusBorderColor='#E88873'
            variant='filled'
            size='md'
          />
          <InputRightElement>
            <IconButton onClick={curriculumName ? () => setShowStartValidation(!showStartValidation) : null} color='#A37774' variant="unstyled" icon={<ArrowForwardIcon />}/>
          </InputRightElement>
        </InputGroup>
      </InputContainer>
    </Wrapper>
  );
}

export default Start;
