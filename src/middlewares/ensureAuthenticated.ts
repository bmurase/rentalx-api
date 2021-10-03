import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            'dss65afcvs2daf8c64x8s964gnsdg'
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exist', 401);
        }

        next();
    } catch {
        throw new AppError('Token is invalid', 401);
    }
}