import './App.css';
import { useState } from 'react';
import { Button, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react';

function App() {
  const [fluxo, setFluxo] = useState([]);
  const [erro, setErro] = useState({
    err: false,
    message: ""
  });

  const addMateria = (array, nome, grau) => {
    const existeMateria = array.find(item => item.nome === nome);

    if (!existeMateria) {
      array.push({
        nome,
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

  const addRequisito = (array, nomeMateriaPai, nomeMateriaFilho) => {
    let indexMateriaPai;
    // Aumenta grau da materia com requisito
    array.forEach((item, index) => {
      if (item.nome === nomeMateriaPai) {
        item.grau++;
        indexMateriaPai = index;
      }
    });

    // Adiciona no requisito a materia em dependenciaDe
    array.forEach((item) => {
      if (item.nome === nomeMateriaFilho) {
        item.dependenciaDe.push({
          nome: nomeMateriaPai,
          index: indexMateriaPai
        })
      }
    });

    setFluxo(array);
  }

  return (
    <div className="App">
      <Button onClick={() => {
        addMateria(fluxo, "APC", 0)
      }}>Adicionar Materia APC</Button>

      <Button onClick={() => {
        addMateria(fluxo, "OO", 0)
      }}>Adicionar Materia OO</Button>

      <Button onClick={() => {
        addRequisito(fluxo, "OO", "APC")
      }}>Adicionar Requisito</Button>

      <Button onClick={() => {
        console.log(fluxo)
      }}>Teste</Button>



      <AlertDialog
        motionPreset='slideInBottom'
        onClose={() => {
          setErro({
            err: false,
            message: ""
          });
        }}
        isOpen={erro.err}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Erro</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {erro.message}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => {
              setErro({
                err: false,
                message: ""
              });
            }}>
              Voltar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default App;
