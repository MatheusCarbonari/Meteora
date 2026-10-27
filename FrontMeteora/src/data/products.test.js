import { describe, expect, test } from 'vitest';
import categories from '../Json/Categorias.json';
import products from './products';

const requiredFields = [
    'id',
    'slug',
    'name',
    'category',
    'price',
    'description',
    'image',
    'imageAlt',
];

describe('catálogo local de produtos', () => {
    test('possui produtos com todos os campos obrigatórios', () => {
        expect(products.length).toBeGreaterThanOrEqual(categories.length);

        products.forEach((product) => {
            requiredFields.forEach((field) => {
                expect(product).toHaveProperty(field);
                expect(product[field]).not.toBe('');
            });
        });
    });

    test('mantém IDs, slugs e nomes únicos e adequados para rotas', () => {
        const ids = products.map(({ id }) => id);
        const slugs = products.map(({ slug }) => slug);
        const names = products.map(({ name }) => name);

        expect(new Set(ids).size).toBe(ids.length);
        expect(new Set(slugs).size).toBe(slugs.length);
        expect(new Set(names).size).toBe(names.length);
        slugs.forEach((slug) => {
            expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        });
    });

    test('armazena preços inteiros e positivos em centavos', () => {
        products.forEach(({ price }) => {
            expect(Number.isInteger(price)).toBe(true);
            expect(price).toBeGreaterThan(0);
        });
    });

    test('associa imagens locais distintas aos produtos', () => {
        const images = products.map(({ image }) => image);

        expect(new Set(images).size).toBe(products.length);
        images.forEach((image) => {
            expect(image).toMatch(/\.webp(?:\?.*)?$/i);
        });
    });

    test('utiliza todas as categorias reconhecidas pelo catálogo', () => {
        const categoryIds = categories.map(({ id }) => id);
        const productCategoryIds = products.map(({ category }) => category);

        expect(new Set(categoryIds).size).toBe(categories.length);
        expect(new Set(productCategoryIds)).toEqual(new Set(categoryIds));
    });

    test('mantém no catálogo os produtos recuperados das fotografias originais', () => {
        expect(products).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    slug: 'calca-reta-rose',
                    category: 'calcas',
                }),
                expect.objectContaining({
                    slug: 'tenis-runner-cinza',
                    category: 'calcados',
                }),
            ])
        );
    });
});
