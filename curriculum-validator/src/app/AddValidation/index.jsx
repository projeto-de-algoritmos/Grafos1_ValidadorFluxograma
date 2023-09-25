import { useState } from 'react';
import AddIcon from '../../assets/add-icon.svg'
import ListItem from '../../assets/list-icon.svg'
import ClassSubjects from './ClassSubjects';
import { ordenacaoTopologica } from '../../utils/topological.js';
import { 
  Wrapper, Title, ContentContainer, ButtonWithIcon, SelectContainer, InputLabel
} from './styles';
import { Input, Checkbox, Button } from '@chakra-ui/react';

function AddValidation({ show, curriculumName }) {
  const [showFields, setShowFields] = useState(false);
  const [dataName, setDataName] = useState("");
  const [checkboxStates, setCheckboxStates] = useState({});
  const [data, setData] = useState([]);
  const [editDisciplina, setEditDisciplina] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

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
    disciplinaToEdit.dependenciaDe.forEach((dep) => {
      selectedDependencies[dep.name] = true;
    });
    setCheckboxStates(selectedDependencies);

    setEditDisciplina({ ...disciplinaToEdit });
    setEditingIndex(index);
    setShowFields(true);
  };

  const handleAddDisciplina = () => {
    const dependenciaDe = Object.keys(checkboxStates).filter(
      (key) => checkboxStates[key]
    );

    let disciplina = {
      name: dataName,
      index: data.length, // Salve o índice da disciplina
      dependenciaDe: [],
      grau: 0,
    };

    // Atualiza as dependências das disciplinas que têm essa disciplina como pré-requisito
    dependenciaDe.forEach((dependency) => {
      const existingDisciplina = data.find((d) => d.name === dependency);
      if (existingDisciplina) {
        existingDisciplina.dependenciaDe = existingDisciplina.dependenciaDe || [];
        existingDisciplina.dependenciaDe.push({ name: dataName, index: disciplina.index }); // Adicione o índice da disciplina
        existingDisciplina.grau++; // Aumenta o grau em 1
      }
    });

    setData((prevData) => [...prevData, disciplina]);

    setDataName("");
    setCheckboxStates({});
    setShowFields(!showFields);
  };

  const handleSaveDisciplina = () => {
    const dependencies = Object.keys(checkboxStates).filter(
      (key) => checkboxStates[key]
    );

    const updatedData = data.map((d, index) => {
      if (index === editingIndex) {
        return {
          name: dataName,
          dependenciaDe: dependencies.map((name) => {
            const index = data.findIndex(item => item.name === name);
            return { name, index };
          }),
          grau: d.grau,
          index: d.index, // Mantém o índice original
        };
      }
      return d;
    });

    // Atualiza as dependências das disciplinas que têm essa disciplina como pré-requisito
    dependencies.forEach((dependency) => {
      const existingDisciplina = data.find((d) => d.name === dependency);
      if (existingDisciplina) {
        existingDisciplina.dependenciaDe = existingDisciplina.dependenciaDe || [];
        existingDisciplina.dependenciaDe.push({ name: dataName, index: editingIndex }); // Use o índice original
        existingDisciplina.grau++; // Aumenta o grau em 1
      }
    });

    setData(updatedData);

    setDataName("");
    setCheckboxStates({});
    setShowFields(!showFields);
  };

  const handleExcluirDisciplina = (index) => {
    const disciplinaToDelete = data[index];

    // Remove a disciplina das dependências de outras disciplinas
    data.forEach((d) => {
      if (d.dependenciaDe) {
        d.dependenciaDe = d.dependenciaDe.filter((dep) => dep.name !== disciplinaToDelete.name);
      }
    });

    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  console.log(data);
  console.log(ordenacaoTopologica(data));

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
      {data.length >= 1 && (<ClassSubjects data={data} handleExcluirDisciplina={handleExcluirDisciplina} onEditDisciplina={handleEditDisciplina} />)}
    </Wrapper>
  );
}

export default AddValidation;
