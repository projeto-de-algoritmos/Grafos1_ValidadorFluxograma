const fluxoInvalido = [{
    nome: "APC",
    grau: 1,
    dependenciaDe: [{
        nome: "OO",
        index: 1
    }]
},{
    nome: "OO",
    grau: 1,
    dependenciaDe: [{
        nome: "MDS",
        index: 2
    }]
},{
    nome: "MDS",
    grau: 1,
    dependenciaDe: [{
        nome: "EPS",
        index: 5
    },{
        nome: "APC",
        index: 0
    }]
},{
    nome: "PP",
    grau: 0,
    dependenciaDe: [{
        nome: "EPS",
        index: 5
    }]
},{
    nome: "TESTES",
    grau: 1,
    dependenciaDe: [{
        nome: "EPS",
        index: 5
    }]
},{
    nome: "EPS",
    grau: 3,
    dependenciaDe: [{
      nome: "TESTES",
      index: 4
  }]
}];


let tempo = 1;

function DFS(grafo) {
  for (let i = 0; i < grafo.length; i++) {
    const v = grafo[i];
    if (!v.visitado) {
      DFS_Visit(grafo, v);
    }
  }

  capturarCiclos(grafo);
}

function DFS_Visit(grafo, v) {
  v.visitado = true;
  v.pre = tempo;
  tempo ++;

  for (let i = 0; i < v.dependenciaDe.length; i++) {
    const w = grafo[v.dependenciaDe[i].index];
    if (!w.visitado) {
      DFS_Visit(grafo, w);
    }
  }

  v.post = tempo;
  tempo ++;
}

function DFS_componente(grafoReverso, v, grafo, pos, componenteArray) {
  componenteArray.push(v.nome);
  grafo[pos].deletado = true;
  grafo[pos].post = -1;

  for (let i = 0; i < v.dependenciaDe.length; i++) {
    const noNormal = grafo[v.dependenciaDe[i].index]
    const w = grafoReverso[v.dependenciaDe[i].index];
    if (!noNormal.deletado) {
      DFS_componente(grafoReverso, w, grafo, v.dependenciaDe[i].index, componenteArray);
    }
  }

}

function capturarCiclos(grafo) {
  const grafoReverso = [];
  const tamGrafo = grafo.length;

  for (let i = 0; i < tamGrafo ; i++) {
    const novoVertice = {
      nome: grafo[i].nome,
      dependenciaDe: []
    }

    grafoReverso.push(novoVertice);
    
  }

  for (let i = 0; i < tamGrafo ; i++) {
    const tamVizinhos = grafo[i].dependenciaDe.length;
    for (let j = 0; j < tamVizinhos; j++) {
      const vizinho = grafo[i].dependenciaDe[j];
      grafoReverso[vizinho.index].dependenciaDe.push({
        nome: grafo[i].nome,
        index: i,
        post: grafo[i].post
      });
    }
  }

  const componentes = [];

  while (true) {
    const existeNo = grafo.findIndex((item) => !item.deletado);
    
    // Verifica se existe algum nó que não tenha o atributo deletado como true
    if (existeNo === -1) {
      break;
    }
    
    const componente = [];
    // Encontra o maior post
    const maiorPost = grafo.reduce((atual, item) => {
      return Math.max(atual, item.post);
    }, -Infinity);
  
    // Encontra o index do elemento com o maior post
    const pos = grafo.findIndex((item) => item.post === maiorPost);

    DFS_componente(grafoReverso, grafoReverso[pos], grafo, pos, componente);

    if (componente.length > 1) {
      componentes.push(componente);
    }
    
  }

  console.log(componentes);

}

DFS(fluxoInvalido);


  