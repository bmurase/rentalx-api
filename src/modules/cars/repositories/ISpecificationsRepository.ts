import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';

export default interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): void;
    index(): Specification[];
    findByName(name: string): Specification;
}
