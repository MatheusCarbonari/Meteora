// Modal
const produtosModalPai = document.querySelector('[data-produtos]');
const closeModal = document.querySelector(".closeModal");
const modal = document.querySelector(".modal");
const fade = document.querySelector(".fade")

produtosModalPai.addEventListener('click', function(evento) {

    if(evento.target.classList.contains('openModal')){
        modal.classList.toggle("hide");
        fade.classList.toggle("hide");
    }

})

closeModal.addEventListener('click',() => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
});


/*********************************************************************************************************/

// Modal Newslatter
const openModalNews = document.querySelector(".cadastro-email__botao");
const closeModalNews = document.querySelector(".closeModalNews");
const modalNews = document.querySelector(".modalNews");
const cadastroCard = document.querySelector(".mensagem-erro");

openModalNews.addEventListener('click', (e) => {
    e.preventDefault();
    
    const retornoValidacao = validaEmail();

    if(retornoValidacao){
        cadastroCard.innerHTML = ""
        modalNews.classList.toggle("hide");
        fade.classList.toggle("hide")
    }else{
        cadastroCard.innerHTML = `Email cadastrado está incorreto, por favor cadastre um email válido!`;
    }

})

closeModalNews.addEventListener('click', () => {
    modalNews.classList.toggle("hide");
    fade.classList.toggle("hide")
})

function validaEmail() {

    const inputNews = document.querySelector('.cadastro-email__input').value;
    let arroba = "@";
    let posicaoArroba = inputNews.indexOf(arroba);

    if( posicaoArroba != -1 && posicaoArroba != 0){

        let stringAposArroba = inputNews.substr(posicaoArroba + 1)
        
        if(stringAposArroba != ""){
            
            var stringAposArrobaArray = Array.from(stringAposArroba);

            if(stringAposArrobaArray[0] === '.'){
                return false
            }

            for(var i = 0; i < stringAposArrobaArray.length; i++){
                if(stringAposArrobaArray[i] === "@"){
                    return false;
                }
            }
            

            for(var i = 0; i < stringAposArrobaArray.length; i++){

                if(stringAposArrobaArray[i] === "."){
                    let posicaoPonto = stringAposArroba.indexOf(".");
                    let aposPonto = stringAposArroba.substr(posicaoPonto + 1);
                    
                    if(aposPonto.length != 0){
                        return true;
                    }

                }
            }

        }

    }
    
}