import { AppError } from '../../../../errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: ICategoriesRepository;

describe('Create category', () => {
    beforeEach(() => {
        categoriesRepository = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: 'name',
            description: 'description',
        };

        await createCategoryUseCase.execute(category);

        const createdCategory = await categoriesRepository.findByName(
            category.name
        );

        expect(createdCategory).toHaveProperty('id');
        expect(createdCategory.name).toBe(category.name);
    });

    it('should not be able to create a new category with already existent name', async () => {
        const category = {
            name: 'name',
            description: 'description',
        };

        await createCategoryUseCase.execute(category);

        await expect(
            createCategoryUseCase.execute(category)
        ).rejects.toBeInstanceOf(AppError);
    });
});
