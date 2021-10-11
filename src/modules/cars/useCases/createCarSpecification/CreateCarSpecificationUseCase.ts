import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import ICreateCarSpecificationDTO from '../../dtos/ICreateCarSpecificationDTO';
import ICarsRepository from '../../repositories/ICarsRepository';

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository') private carsRepository: ICarsRepository
    ) {}

    async execute({
        car_id,
        specifications_id,
    }: ICreateCarSpecificationDTO): Promise<void> {
        const carsExists = await this.carsRepository.findById(car_id);

        if (!carsExists) {
            throw new AppError('Car does not exist!');
        }
    }
}

export { CreateCarSpecificationUseCase };
