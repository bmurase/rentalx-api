import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import ICarsRepository from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        license_plate,
        daily_rate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            license_plate,
            daily_rate,
            brand,
            fine_amount,
            category_id,
        });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async findAllAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const availableCars = this.cars.filter(car => car.available);

        if (name) {
            return availableCars.filter(car => car.name === name);
        }

        if (brand) {
            return availableCars.filter(car => car.brand === brand);
        }

        if (category_id) {
            return availableCars.filter(car => car.category_id === category_id);
        }

        return availableCars;
    }
}

export { CarsRepositoryInMemory };
