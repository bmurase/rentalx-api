import { getRepository, Repository } from 'typeorm';

import ICreateCarDTO from '../../../dtos/ICreateCarDTO';
import ICarsRepository from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        id,
        name,
        description,
        license_plate,
        daily_rate,
        fine_amount,
        brand,
        category_id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            name,
            description,
            license_plate,
            daily_rate,
            fine_amount,
            brand,
            category_id,
            specifications,
        });

        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }

    async findAllAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const query = this.repository
            .createQueryBuilder()
            .where('available = :available', { available: true });

        if (name) {
            query.andWhere('name = :name', { name });
        }

        if (brand) {
            query.andWhere('brand = :brand', { brand });
        }

        if (category_id) {
            query.andWhere('category_id = :category_id', { category_id });
        }

        const cars = await query.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository };
