// Pega o container e a lista de imagens
var carrousel = document.getElementById('carrousel');
var imagemList = carrousel.querySelector('.slider-list');

// variáveis de controle do carrousel
var ImagemIndex = 0;
var tamanhoImagem = carrousel.offsetWidth;
var contagemImagem = imagemList.children.length;

// quantidade de tags imagens nessa lista
var tagsFilhas = imagemList.children
var qtdTagsFilhas = tagsFilhas.length;
// colocando hidden nas imagens que não quero que apareçam na tela
for (i = 1; i < qtdTagsFilhas; i++) {
    tagsFilhas[i].classList.add('hidden')
}


// função para mover para a proxima imagem
function nextImage() {

    // adicionando hidden na imagem atual, para ocultar ela
    imagemList.children[ImagemIndex].classList.add('hidden');

    ImagemIndex++;
    if (ImagemIndex >= contagemImagem) {
        ImagemIndex = 0;
    }

    // removendo hidden na imagem atual, para mostrar ela
    imagemList.children[ImagemIndex].classList.remove('hidden');
}

// função mover para a imagem anterior
function prevImage() {

    // adicionando hidden na imagem atual, para ocultar ela
    imagemList.children[ImagemIndex].classList.add('hidden');

    ImagemIndex--;
    if (ImagemIndex < 0) {
        ImagemIndex = contagemImagem - 1;
    }

    // removendo hidden na imagem atual, para mostrar ela
    imagemList.children[ImagemIndex].classList.remove('hidden');

}

// eventos prev e next
const carrouselContainer = document.querySelector('[data-carrousel]');
const botaoNext = carrouselContainer.querySelector('.carrousel-next');
const botaoPrev = carrouselContainer.querySelector('.carrousel-prev');

botaoNext.addEventListener('click', () => {
    nextImage();
});
botaoPrev.addEventListener('click', () => {
    prevImage();
});