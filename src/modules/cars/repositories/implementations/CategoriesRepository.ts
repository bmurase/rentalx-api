import { getRepository, Repository } from 'typeorm';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.repository = getRepository(Category);
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    public async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({ name, description });

        await this.repository.save(category);
    }

    public async index(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    public async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
