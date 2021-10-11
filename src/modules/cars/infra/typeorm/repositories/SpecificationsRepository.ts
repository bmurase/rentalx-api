import { getRepository, Repository } from 'typeorm';

import ICreateSpecificationDTO from '../../../dtos/ICreateSpecificationDTO';
import ISpecificationsRepository from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    public async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
    }

    public async index(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    public async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async findMany(ids: string[]): Promise<Specification[]> {
        throw new Error('Method not implemented.');
    }
}

export { SpecificationsRepository };
