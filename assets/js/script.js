//Menu Hambúrguer
const button = document.querySelector('.menu__button');

button.addEventListener("click", e =>{
    const menuLista = document.querySelector('#mh');

    let classes = menuLista.classList;

    if(classes.contains("menu-desativado")){
        classes.remove("menu-desativado");
        classes.add("menu-ativado");
    }else if(classes.contains("menu-ativado")){
        classes.remove("menu-ativado");
        classes.add("menu-desativado");
    }

})



/****************************************************************************/

// conectando APIs
async function listaDeProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
    
}

// busca pela barra de pesquisa
async function buscaBarraPesquisa(termoPesquisa) {
    const conexao = await fetch(`http://localhost:3000/produtos?q=${termoPesquisa}`);
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;

}

export const conectaApi = {
    listaDeProdutos,
    buscaBarraPesquisa
}