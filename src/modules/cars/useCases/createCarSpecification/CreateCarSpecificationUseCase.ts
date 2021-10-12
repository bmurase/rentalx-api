import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import ICreateCarSpecificationDTO from '../../dtos/ICreateCarSpecificationDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import ICarsRepository from '../../repositories/ICarsRepository';
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({
        car_id,
        specifications_id,
    }: ICreateCarSpecificationDTO): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError('Car does not exist!');
        }

        const specifications = await this.specificationsRepository.findMany(
            specifications_id
        );

        carExists.specifications = specifications;
        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase };
