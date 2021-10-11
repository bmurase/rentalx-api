import ICreateSpecificationDTO from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();
        Object.assign(specification, { name, description });
        this.specifications.push(specification);
    }

    async index(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(spec => spec.name === name);
    }

    async findMany(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(spec => ids.includes(spec.id));
    }
}

export { SpecificationsRepositoryInMemory };
