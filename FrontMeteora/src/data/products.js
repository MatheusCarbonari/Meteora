import bagImage from '../Assets/Desktop/Cards/Bolsa.png';
import pantsImage from '../Assets/Desktop/Cards/Calça.png';
import shirtImage from '../Assets/Desktop/Cards/Camiseta.png';
import jacketImage from '../Assets/Desktop/Cards/Jaqueta.png';
import glassesImage from '../Assets/Desktop/Cards/óculos.png';
import sneakersImage from '../Assets/Desktop/Cards/Tenis.png';

const products = [
    {
        id: 'product-001',
        slug: 'bolsa-caramelo-urbana',
        name: 'Bolsa Caramelo Urbana',
        category: 'bolsas',
        price: 12000,
        description: 'Bolsa estruturada em tom caramelo para acompanhar produções urbanas.',
        image: bagImage,
        imageAlt: 'Bolsa caramelo estruturada com alças de mão',
    },
    {
        id: 'product-002',
        slug: 'calca-alfaiataria-ampla',
        name: 'Calça de Alfaiataria Ampla',
        category: 'calcas',
        price: 18000,
        description: 'Calça clara de cintura alta e modelagem ampla para combinações versáteis.',
        image: pantsImage,
        imageAlt: 'Calça clara de alfaiataria com modelagem ampla',
    },
    {
        id: 'product-003',
        slug: 'tenis-chunky-claro',
        name: 'Tênis Chunky Claro',
        category: 'calcados',
        price: 25000,
        description: 'Tênis claro de solado robusto inspirado na estética streetwear.',
        image: sneakersImage,
        imageAlt: 'Tênis chunky claro com solado robusto',
    },
    {
        id: 'product-004',
        slug: 'camiseta-essential-mostarda',
        name: 'Camiseta Essential Mostarda',
        category: 'camisetas',
        price: 7000,
        description: 'Camiseta mostarda de corte reto para composições casuais.',
        image: shirtImage,
        imageAlt: 'Camiseta de manga curta na cor mostarda',
    },
    {
        id: 'product-005',
        slug: 'jaqueta-jeans-oversized',
        name: 'Jaqueta Jeans Oversized',
        category: 'casacos',
        price: 15000,
        description: 'Jaqueta jeans azul de modelagem ampla com gola contrastante.',
        image: jacketImage,
        imageAlt: 'Jaqueta jeans azul oversized com gola marrom',
    },
    {
        id: 'product-006',
        slug: 'oculos-redondo-classico',
        name: 'Óculos Redondo Clássico',
        category: 'oculos',
        price: 12000,
        description: 'Óculos de armação redonda e escura para um visual contemporâneo.',
        image: glassesImage,
        imageAlt: 'Óculos de armação redonda escura',
    },
];

export default products;
