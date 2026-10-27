import originalPantsImage from '../Assets/img/CardsCatalogo/Calça.webp';
import jacketImage from '../Assets/img/CardsCatalogo/Jaqueta.webp';
import glassesImage from '../Assets/img/CardsCatalogo/óculos.webp';
import originalSneakersImage from '../Assets/img/CardsCatalogo/Tenis.webp';
import caramelBagImage from '../Assets/img/CardsCatalogo/Catalago01.webp';
import blackBagImage from '../Assets/img/CardsCatalogo/Catalogo02.webp';
import tailoredPantsImage from '../Assets/img/CardsCatalogo/Catalogo03.webp';
import cargoPantsImage from '../Assets/img/CardsCatalogo/Catalogo04.webp';
import denimJacketImage from '../Assets/img/CardsCatalogo/Catalogo05.webp';
import roundSunglassesImage from '../Assets/img/CardsCatalogo/Catalogo06.webp';
import rectangularSunglassesImage from '../Assets/img/CardsCatalogo/Catalogo07.webp';
import chunkySneakersImage from '../Assets/img/CardsCatalogo/Catalogo08.webp';
import highTopSneakersImage from '../Assets/img/CardsCatalogo/Catalogo09.webp';
import mustardShirtImage from '../Assets/img/CardsCatalogo/Catalogo10.webp';

const products = [
    {
        id: 'product-001',
        slug: 'bolsa-caramelo-urbana',
        name: 'Bolsa Caramelo Urbana',
        category: 'bolsas',
        price: 12000,
        description: 'Bolsa estruturada em tom caramelo para acompanhar produções urbanas.',
        image: caramelBagImage,
        imageAlt: 'Bolsa caramelo estruturada com zíperes frontais',
    },
    {
        id: 'product-002',
        slug: 'calca-alfaiataria-ampla',
        name: 'Calça de Alfaiataria Ampla',
        category: 'calcas',
        price: 18000,
        description: 'Calça clara de cintura alta e modelagem ampla para combinações versáteis.',
        image: tailoredPantsImage,
        imageAlt: 'Calça bege de alfaiataria com modelagem ampla',
    },
    {
        id: 'product-003',
        slug: 'tenis-chunky-claro',
        name: 'Tênis Chunky Claro',
        category: 'calcados',
        price: 25000,
        description: 'Tênis claro de solado robusto inspirado na estética streetwear.',
        image: chunkySneakersImage,
        imageAlt: 'Tênis chunky bege com solado robusto',
    },
    {
        id: 'product-004',
        slug: 'camiseta-essential-mostarda',
        name: 'Camiseta Essential Mostarda',
        category: 'camisetas',
        price: 7000,
        description: 'Camiseta mostarda de corte reto para composições casuais.',
        image: mustardShirtImage,
        imageAlt: 'Camiseta mostarda de manga curta e corte reto',
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
    {
        id: 'product-007',
        slug: 'bolsa-tote-preta-minimalista',
        name: 'Bolsa Tote Preta Minimalista',
        category: 'bolsas',
        price: 13900,
        description: 'Bolsa preta de linhas limpas e alça longa para a rotina urbana.',
        image: blackBagImage,
        imageAlt: 'Bolsa tote preta de alça longa',
    },
    {
        id: 'product-008',
        slug: 'calca-cargo-oliva',
        name: 'Calça Cargo Oliva',
        category: 'calcas',
        price: 16900,
        description: 'Calça cargo oliva de pernas amplas com bolsos laterais utilitários.',
        image: cargoPantsImage,
        imageAlt: 'Calça cargo oliva ampla com bolsos laterais',
    },
    {
        id: 'product-009',
        slug: 'jaqueta-denim-boxy',
        name: 'Jaqueta Denim Boxy',
        category: 'casacos',
        price: 18900,
        description: 'Jaqueta denim azul de corte boxy e acabamento clássico.',
        image: denimJacketImage,
        imageAlt: 'Jaqueta denim azul de modelagem boxy',
    },
    {
        id: 'product-010',
        slug: 'oculos-solar-redondo-dourado',
        name: 'Óculos Solar Redondo Dourado',
        category: 'oculos',
        price: 9900,
        description: 'Óculos solar redondo com armação dourada leve e lentes escuras.',
        image: roundSunglassesImage,
        imageAlt: 'Óculos solar redondo com armação dourada',
    },
    {
        id: 'product-011',
        slug: 'oculos-retangular-preto',
        name: 'Óculos Retangular Preto',
        category: 'oculos',
        price: 11000,
        description: 'Óculos preto de formato retangular estreito com atitude urbana.',
        image: rectangularSunglassesImage,
        imageAlt: 'Óculos preto com armação retangular estreita',
    },
    {
        id: 'product-012',
        slug: 'tenis-high-top-bicolor',
        name: 'Tênis High-Top Bicolor',
        category: 'calcados',
        price: 22900,
        description: 'Tênis de cano alto em preto e branco inspirado nas quadras.',
        image: highTopSneakersImage,
        imageAlt: 'Tênis de cano alto preto e branco',
    },
    {
        id: 'product-013',
        slug: 'calca-reta-rose',
        name: 'Calça Reta Rosé',
        category: 'calcas',
        price: 15900,
        description: 'Calça de alfaiataria rosé com corte reto e comprimento cropped.',
        image: originalPantsImage,
        imageAlt: 'Calça de alfaiataria rosé com corte reto e comprimento cropped',
    },
    {
        id: 'product-014',
        slug: 'tenis-runner-cinza',
        name: 'Tênis Runner Cinza',
        category: 'calcados',
        price: 21900,
        description: 'Tênis runner cinza em mesh com solado robusto e visual esportivo.',
        image: originalSneakersImage,
        imageAlt: 'Tênis runner cinza em mesh com solado robusto',
    },
];

export default products;
