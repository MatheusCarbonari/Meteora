import { conectaApi } from "./script.js";
import constroiCard from "./imprimirLista.js";

async function buscarProdutos(evento) {
    evento.preventDefault();

    const dadosPesquisa = document.querySelector("[data-pesquisa]").value;
    const buscaDaApi = await conectaApi.buscaBarraPesquisa(dadosPesquisa);
    const localCards = document.querySelector("[data-produtos]");

    while(localCards.firstChild){
        localCards.removeChild(localCards.firstChild);
    };

    buscaDaApi.forEach(elemento => {
        localCards.appendChild(constroiCard(elemento.produto, elemento.categoria, elemento.descricao, elemento.preco, elemento.imagem));
    })

    if(buscaDaApi.length == 0){
        localCards.innerHTML = `<h2 class="produtos__titulo">Não existem produtos nessa categoria</h2>`;
    }

}

const botaoPesquisa = document.querySelector("[data-pesquisa-botao]");

botaoPesquisa.addEventListener('click', evento => buscarProdutos(evento));