import ICreateCategoryDTO from '../dtos/CreateCategoryDTO';
import { Category } from '../models/Category';

export default interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): void;
    index(): Category[];
    findByName(name: string): Category;
}
