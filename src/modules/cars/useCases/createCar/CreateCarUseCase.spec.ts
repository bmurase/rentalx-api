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
        await createCarUseCase.execute({
            name: 'Corsa',
            description: 'Corsa rebaixado',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 100,
            brand: 'GM',
            category_id: 'category_id',
        });
    });
});
