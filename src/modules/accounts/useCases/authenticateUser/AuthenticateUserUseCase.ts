import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import IAuthenticateUserDTO from '../../dtos/IAuthenticateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({
        email,
        password,
    }: IAuthenticateUserDTO): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email or password!');
        }

        const passwordMatches = await compare(password, user.password);

        if (!passwordMatches) {
            throw new AppError('Incorrect email or password!');
        }

        const token = sign({}, 'dss65afcvs2daf8c64x8s964gnsdg', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token } as IResponse;
    }
}

export { AuthenticateUserUseCase };
