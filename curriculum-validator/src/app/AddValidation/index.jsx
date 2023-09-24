import { useState } from 'react';
import AddIcon from '../../assets/add-icon.svg'
import ListItem from '../../assets/list-icon.svg'
import ClassSubjects from './ClassSubjects';
import { 
  Wrapper, Title, ContentContainer, ButtonWithIcon, SelectContainer, InputLabel
} from './styles';
import {  Input, Checkbox, Button } from '@chakra-ui/react';

function AddValidation({ show, curriculumName }) {
  const [showFields, setShowFields] = useState(false);
  const [dataName, setDataName] = useState(""); // Estado para o nome da disciplina
  const [checkboxStates, setCheckboxStates] = useState({}); // Estado para os checkboxes
  const [data, setData] = useState([]); // Estado para armazenar os dados
  const [editDisciplina, setEditDisciplina] = useState(null); // Estado para a disciplina em edição
  const [editingIndex, setEditingIndex] = useState(null); // Estado para o índice da disciplina em edição


  const handleInputChange = (e) => {
    setDataName(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleEditDisciplina = (index) => {
    const disciplinaToEdit = data[index];
    setDataName(disciplinaToEdit.name);
  
    // Preencha os checkboxes com os pré-requisitos selecionados
    const selectedDependencies = {};
    disciplinaToEdit.dependencies.forEach((dep) => {
      selectedDependencies[dep.name] = true;
    });
    setCheckboxStates(selectedDependencies);
  
    setEditDisciplina({ ...disciplinaToEdit });
    setEditingIndex(index);
    setShowFields(true);
  };
  
  const handleAddDisciplina = () => {
    if (editDisciplina !== null && editingIndex !== null) {
      // Atualize a disciplina existente
      const updatedData = [...data];
      updatedData[editingIndex] = { ...editDisciplina };
      setData(updatedData);
      setEditDisciplina(null);
      setEditingIndex(null);
    } else {
      // Adicione uma nova disciplina
      const dependencies = Object.keys(checkboxStates).filter(
        (key) => checkboxStates[key]
      );
  
      const disciplina = {
        name: dataName,
        dependencies: dependencies.map((name) => ({ name })),
      };
  
      setData((prevData) => [...prevData, disciplina]);
    }
  
    setDataName("");
    setCheckboxStates({});
    setShowFields(!showFields);
  };

  const handleSaveDisciplina = () => {
    if (editDisciplina !== null && editingIndex !== null) {
      // Atualize a disciplina existente
      const updatedData = [...data];
      updatedData[editingIndex] = {
        name: dataName,
        dependencies: Object.keys(checkboxStates).filter(
          (key) => checkboxStates[key]
        ).map((name) => ({ name })),
      };
      setData(updatedData);
      setEditDisciplina(null);
      setEditingIndex(null);
    } else {
      // Adicione uma nova disciplina (lógica semelhante à função handleAddDisciplina)
      const dependencies = Object.keys(checkboxStates).filter(
        (key) => checkboxStates[key]
      );
  
      const disciplina = {
        name: dataName,
        dependencies: dependencies.map((name) => ({ name })),
      };
  
      setData((prevData) => [...prevData, disciplina]);
    }
  
    setDataName("");
    setCheckboxStates({});
    setShowFields(!showFields);
  };

  return (
    <Wrapper show={show}>
      <Title>{curriculumName || "Grade curricular"}</Title>
      <ContentContainer show={!showFields}>
        <ButtonWithIcon onClick={(() => setShowFields(!showFields))}>
          Adicionar Disciplina
          <span>
            <img src={AddIcon} alt="Ícone" />
          </span>
        </ButtonWithIcon>
        {data.length >= 1 && (
          <ButtonWithIcon>
            Validar Grade
            <span>
              <img class="listIcon" src={ListItem} alt="Ícone" />
            </span>
          </ButtonWithIcon>
        )}
      </ContentContainer>
      <ContentContainer show={showFields} addMargin>
        <InputLabel>Nome da disciplina</InputLabel>
        <Input
          required
          value={dataName}
          placeholder="Nome"
          color="#A37774"
          _placeholder={{ color: "#A37774" }}
          focusBorderColor="#E88873"
          variant="filled"
          size="md"
          onChange={handleInputChange}
        />
        {(data.length >= 1) && (
          <>
            {!editDisciplina && <InputLabel>Selecionar pré-requisitos</InputLabel>}
            <SelectContainer>
              {data?.map?.((item, index) => (
                <>
                  {index !== editingIndex && (
                    <Checkbox
                      key={index}
                      colorScheme="orange"
                      name={item.name}
                      checked={!!checkboxStates[item.name]}
                      onChange={handleCheckboxChange}
                    >
                      {item.name}
                    </Checkbox>
                  )}
                </>
              ))}
            </SelectContainer>
          </>
        )}
        {!editDisciplina ? (
          <Button
            color="#A37774"
            bg="#EADEDA"
            border="2px"
            borderColor="#A37774"
            width="9rem"
            size="sm"
            onClick={dataName ? () => handleAddDisciplina() : null}
          >
            Adicionar Disciplina
          </Button>
        ) : (
          <Button
            color="#A37774"
            bg="#EADEDA"
            border="2px"
            borderColor="#A37774"
            width="9rem"
            size="sm"
            onClick={() => handleSaveDisciplina()}
          >
            Salvar Edição
          </Button>
        )}
      </ContentContainer>
      {data.length >= 1 && (<ClassSubjects data={data} editDisciplina={editDisciplina} onEditDisciplina={handleEditDisciplina} />)}
    </Wrapper>
  );
}

export default AddValidation;
