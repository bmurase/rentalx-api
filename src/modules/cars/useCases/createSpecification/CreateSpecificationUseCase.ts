import ICreateSpecificationDTO from '../../dtos/ICreateSpecificationDTO';
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository';

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    public execute({ name, description }: ICreateSpecificationDTO): void {
        const specificationAlreadyExists =
            this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists');
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
