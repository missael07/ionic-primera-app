
import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'seed-app';
    private static expireIn: string = '30d';

    constructor() {
        
    }

    static getToken( payload: any): string {
        
        return jwt.sign({
            user: payload
        }, this.seed, {expiresIn: this.expireIn})
    }

    static validateToke(userToken: string) {

        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                } else {
                    resolve(decoded);
            }
        });
        })

    }
}