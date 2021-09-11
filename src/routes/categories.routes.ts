import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

const upload = multer({
    dest: './tmp',
});

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
);

export { categoriesRouter };
