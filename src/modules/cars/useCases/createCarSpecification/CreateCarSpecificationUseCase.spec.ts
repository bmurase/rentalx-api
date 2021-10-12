import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository,
            specificationsRepository
        );
    });

    it('should be able to add a specification for an existent car', async () => {
        const car = await carsRepository.create({
            name: 'car',
            description: 'car description',
            license_plate: 'ABC-1234',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'brand',
            category_id: 'category_id',
        });

        const firstSpecification = await specificationsRepository.create({
            name: 'specification 1',
            description: 'description 1',
        });

        const secondSpecification = await specificationsRepository.create({
            name: 'specification 2',
            description: 'description 2',
        });

        const updatedCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [firstSpecification.id, secondSpecification.id],
        });

        expect(updatedCar.specifications).toMatchObject([
            firstSpecification,
            secondSpecification,
        ]);
    });

    it('should not be able to add a specification for a nonexistent car', async () => {
        await expect(
            createCarSpecificationUseCase.execute({
                car_id: '123',
                specifications_id: ['1', '2', '3'],
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
