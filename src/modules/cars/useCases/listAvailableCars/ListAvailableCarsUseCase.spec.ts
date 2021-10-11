import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('List cars', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it('should be able to list cars', async () => {
        const firstCar = carsRepository.create({
            name: 'Corsa',
            description: 'Corsa capotado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'GM',
            license_plate: 'ABC-1234',
            category_id: 'categoryId',
        });

        const secondCar = carsRepository.create({
            name: 'Corsinha',
            description: 'Corsa rebaixado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'GM',
            license_plate: 'DEF-5678',
            category_id: 'categoryId',
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toMatchObject([firstCar, secondCar]);
    });

    it('should be able to list all available cars by name', async () => {
        carsRepository.create({
            name: 'Corsa',
            description: 'Corsa capotado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'GM',
            license_plate: 'ABC-1234',
            category_id: 'categoryId',
        });

        const secondCar = carsRepository.create({
            name: 'Uno',
            description: 'Uninho rebaixado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'Fiat',
            license_plate: 'DEF-5678',
            category_id: 'categoryId',
        });

        const cars = await listAvailableCarsUseCase.execute({ name: 'Uno' });

        expect(cars).toMatchObject([secondCar]);
    });

    it('should be able to list all available cars by brand', async () => {
        const firstCar = carsRepository.create({
            name: 'Corsa',
            description: 'Corsa capotado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'GM',
            license_plate: 'ABC-1234',
            category_id: 'categoryId',
        });

        carsRepository.create({
            name: 'Uno',
            description: 'Uninho rebaixado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'Fiat',
            license_plate: 'DEF-5678',
            category_id: 'categoryId',
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: 'GM' });

        expect(cars).toMatchObject([firstCar]);
    });

    it('should be able to list all available cars by category id', async () => {
        const firstCar = carsRepository.create({
            name: 'Corsa',
            description: 'Corsa capotado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'GM',
            license_plate: 'ABC-1234',
            category_id: '123',
        });

        carsRepository.create({
            name: 'Uno',
            description: 'Uninho rebaixado',
            daily_rate: 100,
            fine_amount: 100,
            brand: 'Fiat',
            license_plate: 'DEF-5678',
            category_id: '456',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: '123',
        });

        expect(cars).toMatchObject([firstCar]);
    });
});
