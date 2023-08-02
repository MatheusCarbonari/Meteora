// imports 
import { conectaApi } from "./script.js";
import constroiCard from "./imprimirLista.js";

// seleciona as categorias aonde queremos adicionar um evento
const categoriasCards = document.querySelectorAll(".categorias__cards");

// utilizado o forEach para acrescentar um evento de click em todas as categorias
categoriasCards.forEach(function(elemento) {
    
    // adiciona o evento a cada elemento selecionado anteriormente, e chama a função para
    // filtrar as categorias e construir o card
    elemento.addEventListener('click', function() {
        listaPorCategoria(elemento)
    })

})

// função que filtra e chama a controiCard()
async function listaPorCategoria(categoriaAtual) {

    // Chega no texto dentro da div clicada
    let categoria = categoriaAtual.children[1];
    let textoCategoria = categoria.textContent

    // filtra da lista que veio da API, e forma uma nova lista só com a categoria selecionada
    const listaProdutosApi = await conectaApi.listaDeProdutos();
    const listaFiltradaPorCategoria = listaProdutosApi.filter(function(produto){
        return produto.categoria === textoCategoria
    })
    
    // define aonde vai ser colocada a lista
    const localCardsCategoria = document.querySelector('[data-produtos]');

    // limpa a lista anterior
    while(localCardsCategoria.firstChild){
        localCardsCategoria.removeChild(localCardsCategoria.firstChild);
    }

    // intera sobre a lista filtrada e constrói um card para cada elemento dentro da lista
    listaFiltradaPorCategoria.forEach((element) => {
        localCardsCategoria.appendChild(constroiCard(element.produto, element.categoria, element.descricao, element.preco, element.imagem))
    })

    // exibe uma mensagem caso a não haja nenhum produto cadastrado naquela categoria
    if(listaFiltradaPorCategoria.length == 0){
        localCardsCategoria.innerHTML = `<h2 class="produtos__titulo">Não existem produtos nessa categoria</h2>`;
    }

}
