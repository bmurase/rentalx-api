import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

export default interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): Promise<Specification>;
    index(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
    findMany(ids: string[]): Promise<Specification[]>;
}
