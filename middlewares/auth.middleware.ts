import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';

export const verifyToken = (req: any, resp: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.validateToke(userToken).then((decoded: any) => {
        req.user = decoded.user;
        next();
    }).catch(err => {
        resp.json({
            ok: false,
            message: 'Token incorrecto'
        });
    });
        
}