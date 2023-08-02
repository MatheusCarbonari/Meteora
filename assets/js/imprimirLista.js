// Possibilita importar a função listaDeProdutos do script.js
import { conectaApi } from "./script.js";

// acha o local que os cards serão inseridos
const Localcards = document.querySelector("[data-produtos]");

// função para contruir os cards
export default function constroiCard(produto, categoria, descricao, preco, imagem) {
    // insere uma div antes de inserir os html abaixo
    const card = document.createElement("div");

    // insere classes a const 'card'
    card.className = "produtos-card openModal";

    // insere um html com JS
    card.innerHTML = `  <img src="${imagem}" alt="${produto}" class="produtos-card__image openModal">
                        <h3 class="produtos-card__titulo">${produto}</h3>
                        <p class="produtos-card__texto">${descricao}</p>
                        <h3 class="produtos-card__titulo">R$ ${preco},00</h3>
                        <a class="produto-card__button-link" href="">Ver mais</a>`

    return card;

}

// função para comparar a qtd de produtos vendidos, utilizada jundo da função sort()
function compararVendas(a, b) {
    return b.vendidos - a.vendidos
}

// função para buscar, através da API, as informações do banco e tornar os cards dinâmicos
// necessário o async porque vai utilizar a conexão com a API
async function listaCards(){

    // tente isso
    try{

        // salva a lista que veio da API, em uma const
        const listaProdutosVindaDaApi = await conectaApi.listaDeProdutos();

        // sort() utilizada para ordenar a lista por ordem de qtd de produtos vendidos
        listaProdutosVindaDaApi.sort(compararVendas);
        // cria uma cópia da lista original somente com os primeiros 6
        let novaListaDeProdutos = listaProdutosVindaDaApi.slice(0, 6)

        // função para percorrer cada elemento da const, que é um array
        novaListaDeProdutos.forEach((e) => {

            // pega o local definido para conter os cards, e adiciona um 'filho', através da função controiCard.
            // passando todos os elementos necessários para tornar a construção dos cards dinâmicos
            Localcards.appendChild(constroiCard(e.produto, e.categoria, e.descricao, e.preco, e.imagem));
        
        });

    // se não pegue isso
    }catch{

        // para quando acontecer um erro diferente do que foi lançado no try
        Localcards.innerHTML = `<h2 class="produtos__titulo">Não foi possível carregas a lista de produtos</h2>`;

    }

}

// chama a função para ser executada
listaCards();