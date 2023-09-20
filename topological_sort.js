const fluxoValido = [{
    nome: "APC",
    grau: 0,
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
    grau: 0,
    dependenciaDe: [{
        nome: "EPS",
        index: 5
    }]
},{
    nome: "EPS",
    grau: 3,
    dependenciaDe: []
}];

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
    grau: 0,
    dependenciaDe: [{
        nome: "EPS",
        index: 5
    }]
},{
    nome: "EPS",
    grau: 3,
    dependenciaDe: []
}];

const ordenacaoTopologica = (grafo) => {
    const ordemTopologica = [];
    const fila = grafo.filter(item => item.grau == 0); // Iniciação da fila com todos os nós com 0 dependencias O(n)
    const array = grafo;
    
    while (fila.length) {
        const noAtual = fila.shift(); // Pega o primeiro da fila dos nós com 0 dependencia
        if (!noAtual) {
            fila.length = 0;
        } else {
            ordemTopologica.push(noAtual); // Adiciona na array da ordem topologica

            for (let i = 0, len = noAtual.dependenciaDe.length; i < len; i++) { // Atualização do grau dos vizinhos
                const index = noAtual.dependenciaDe[i].index;
                
                array[index].grau--;
                if (array[index].grau == 0) {
                    fila.push(array[index]); // Se grau for zero, vai para a fila
                }
            }

        }
    }

    return array.length == ordemTopologica.length; // Se a array final de ordem topológica não tiver o mesmo tamanho, é porque o fluxo não é válido e possui um ciclo
    
}

const resultadoValido = ordenacaoTopologica(fluxoValido);
const resultadoInvalido = ordenacaoTopologica(fluxoInvalido);
console.log("Resultado Válido:")
console.log(resultadoValido);
console.log("Resultado Inválido:")
console.log(resultadoInvalido);
