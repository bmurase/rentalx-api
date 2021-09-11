import { Category } from '../../models/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    public execute(): Category[] {
        return this.categoriesRepository.index();
    }
}

export { ListCategoriesUseCase };
