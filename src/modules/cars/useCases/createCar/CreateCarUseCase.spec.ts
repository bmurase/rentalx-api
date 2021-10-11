import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create car', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Corsa',
            description: 'Corsa rebaixado',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 100,
            brand: 'GM',
            category_id: 'category_id',
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a new car with an already existent license plate', async () => {
        const car = {
            name: 'Corsa',
            description: 'Corsa rebaixado',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 100,
            brand: 'GM',
            category_id: 'category_id',
        };

        await createCarUseCase.execute(car);

        await expect(createCarUseCase.execute(car)).rejects.toBeInstanceOf(
            AppError
        );
    });

    it('should be able to create a new car as available by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Corsa',
            description: 'Corsa rebaixado',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 100,
            brand: 'GM',
            category_id: 'category_id',
        });

        expect(car.available).toBe(true);
    });
});
