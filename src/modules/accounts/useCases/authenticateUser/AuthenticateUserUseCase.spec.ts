import { AppError } from '../../../../shared/errors/AppError';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
            driver_license: '123456',
        };

        await createUserUseCase.execute(user);

        const authentication = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(authentication).toHaveProperty('token');
    });

    it('should not be able to authenticate a nonexistent user', async () => {
        expect(
            authenticateUserUseCase.execute({
                email: 'nonexistent.user@example.com',
                password: 'password',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate an user with incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
            driver_license: '123456',
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate an user with incorrect email', async () => {
        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
            driver_license: '123456',
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: 'john.do3@example.com',
                password: user.password,
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
