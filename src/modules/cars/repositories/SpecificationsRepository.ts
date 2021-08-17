import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../models/Specification';
import ISpecificationsRepository from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    public create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        Object.assign(specification, { name, description });
        this.specifications.push(specification);
    }

    public index(): Specification[] {
        return this.specifications;
    }

    public findByName(name: string): Specification {
        const specification = this.specifications.find(
            specification => specification.name === name
        );
        return specification;
    }
}

export { SpecificationsRepository };
