const fluxoValido = [{
    nome: "APC",
    grau: 0,
    dependencias: []
},
{
    nome: "OO",
    grau: 1,
    dependencias: ["APC"]
},
{
    nome: "MDS",
    grau: 1,
    dependencias: ["OO"]
},
{
    nome: "PP",
    grau: 0,
    dependencias: []
},
{
    nome: "TESTES",
    grau: 0,
    dependencias: []
},
{
    nome: "EPS",
    grau: 3,
    dependencias: ["MDS", "PP", "TESTES"]
}];

const fluxoInvalido = [{
    nome: "APC",
    grau: 1,
    dependencias: ["MDS"] // Esse gera um paradoxo
},
{
    nome: "OO",
    grau: 1,
    dependencias: ["APC"]
},
{
    nome: "MDS",
    grau: 1,
    dependencias: ["OO"]
},
{
    nome: "PP",
    grau: 0,
    dependencias: []
},
{
    nome: "TESTES",
    grau: 0,
    dependencias: []
},
{
    nome: "EPS",
    grau: 3,
    dependencias: ["MDS", "PP", "TESTES"]
}];

const ordenacaoTopologica = (grafo) => {
    const ordemTopologica = [];
    const fila = grafo.filter(item => item.grau == 0); // Iniciação da fila com todos os nós com 0 dependencias O(n)
    const array = grafo.filter(item => item.grau !== 0); // Retirada dos nós com 0 de dependência O(n)
    
    while (fila.length) {
        const noAtual = fila.shift(); // Pega o primeiro da fila dos nós com 0 dependencia
        if (!noAtual) {
            fila.length = 0;
        } else {
            ordemTopologica.push(noAtual); // Adiciona na array da ordem topologica
            for (let index = 0, len = array.length; index < len; index++) { // Procurar todos os nós com dependência
                const materia = array[index];
                const possuiDependenciaNoAtual = materia.dependencias.find(item => {
                    return item == noAtual.nome;
                });
                if (possuiDependenciaNoAtual) {
                    array[index].grau--; // Diminuir grau da materia com dependência
                    if (array[index].grau == 0) {
                        fila.push(array[index]); // Se grau for zero, vai para a fila
                    }
                }
            }
        }
    }

    return ordemTopologica;
}

const resultadoValido = ordenacaoTopologica(fluxoValido);
const resultadoInvalido = ordenacaoTopologica(fluxoInvalido);
console.log("Resultado Válido:")
console.log(resultadoValido);
console.log("Resultado Inválido: ")
console.log(resultadoInvalido);