import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    public async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.forEach(async category => {
            const { name, description } = category;
            const existCategory = await this.categoriesRepository.findByName(
                name
            );

            if (!existCategory) {
                await this.categoriesRepository.create({ name, description });
            }
        });
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
                    deleteFile(file.path);
                    resolve(categories);
                })
                .on('error', err => reject(err));
        });
    }
}

export { ImportCategoryUseCase };
