import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    public execute({ name, description }: ICreateCategoryDTO): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
