import { inject, injectable } from 'tsyringe';

import IListAvailableCarsDTO from '../../dtos/IListAvailableCarsDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import ICarsRepository from '../../repositories/ICarsRepository';

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository') private carsRepository: ICarsRepository
    ) {}

    async execute({
        brand,
        name,
        category_id,
    }: IListAvailableCarsDTO): Promise<Car[]> {
        const cars = await this.carsRepository.findAllAvailable(
            name,
            brand,
            category_id
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
