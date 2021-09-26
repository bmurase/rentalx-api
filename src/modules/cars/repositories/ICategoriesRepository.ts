import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import { Category } from '../entities/Category';

export default interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<void>;
    index(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}
