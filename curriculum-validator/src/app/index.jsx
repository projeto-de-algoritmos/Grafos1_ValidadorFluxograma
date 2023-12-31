import { 
  Wrapper, ContentWrapper, ValidationContainer, Title, Subtitle, Description, UnderpageText, Container
} from './styles';
import Start from './Start/index';
import AddValidation from './AddValidation';
import { useState } from 'react';

function App() {
  const [showStartValidation, setShowStartValidation] = useState(true);
  const [curriculumName, setCurriculumName] = useState('');
  const [fluxo, setFluxo] = useState([]);
  const [erro, setErro] = useState({
    err: false,
    message: ""
  });

  const addMateria = (array, name, grau) => {
    const existeMateria = array.find(item => item.name === name);

    if (!existeMateria) {
      array.push({
        name,
        grau,
        dependenciaDe: []
      });
      setFluxo(array);
    } else {
      setErro({
        err: true,
        message: "Matéria já existe"
      });
    }
  }

  const addRequisito = (array, nameMateriaPai, nameMateriaFilho) => {
    let indexMateriaPai;
    // Aumenta grau da materia com requisito
    array.forEach((item, index) => {
      if (item.name === nameMateriaPai) {
        item.grau++;
        indexMateriaPai = index;
      }
    });

    // Adiciona no requisito a materia em dependenciaDe
    array.forEach((item) => {
      if (item.name === nameMateriaFilho) {
        item.dependenciaDe.push({
          name: nameMateriaPai,
          index: indexMateriaPai
        })
      }
    });

    setFluxo(array);
  }

  return (
    <Wrapper> 
        <ContentWrapper>
          <Title>Curriculum<br/><span>Validator</span></Title>
          <Subtitle>Validar Grade Curricular</Subtitle>
          <Description>O Curriculum Validator é uma ferramenta que verifica automaticamente a coerência e consistência dos fluxos de grade escolar, evitando conflitos e facilitando a gestão curricular.</Description>
        </ContentWrapper>
        <Container>
          <ValidationContainer>
            <Start
              showStartValidation={showStartValidation}
              setShowStartValidation={setShowStartValidation}
              curriculumName={curriculumName}
              setCurriculumName={setCurriculumName}
            />
            <AddValidation show={!showStartValidation} curriculumName={curriculumName} />
          </ValidationContainer>
          <UnderpageText>Desenvolvido por Clara Ribeiro e Natan Tavares</UnderpageText>
        </Container>
    </Wrapper>
  );
}

export default App;
