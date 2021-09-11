import csvParse from 'csv-parse';
import fs from 'fs';

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    public async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
    }

    private loadCategories(
        file: Express.Multer.File
    ): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();
            const stream = fs.createReadStream(file.path);
            stream.pipe(parseFile);

            parseFile
                .on('data', async line => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on('end', () => {
                    resolve(categories);
                })
                .on('error', err => reject(err));
        });
    }
}

export { ImportCategoryUseCase };