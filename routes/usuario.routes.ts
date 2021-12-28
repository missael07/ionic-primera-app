import { Request, Response, Router } from "express";
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verifyToken } from '../middlewares/auth.middleware';
const userRoutes = Router();


//Login
userRoutes.post('/signin', (req: Request, resp: Response) => { 
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, userDB) => {
        if (err) throw err;
        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }

        if (userDB.comparePassword(password)) {
            const userToken = Token.getToken({
                _id: userDB._id,
                name: userDB.name,
                password: userDB.password,
                email: userDB.email
            });
            resp.json({
                ok: true,
                userToken
            });
        } else {
            resp.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }

    })
});


//Insert User
userRoutes.post('/create', (req: Request, resp: Response) => {
    const { name, email, password, avatar} = req.body;

    const user = { 
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        avatar
    }

    User.create(user)
        .then(userDB => {
            const userToken = Token.getToken({
                _id: userDB._id,
                name: userDB.name,
                password: userDB.password,
                email: userDB.email
            });
            resp.json({
                ok: true,
                userToken
        });
        }).catch(err => {
            resp.json({
                ok: false,
                err
            });
    }); 
});

//Update User
userRoutes.post('/update', verifyToken , (req: any, resp: Response) => { 

    const { name, password, email } = req.body || req.user;

    const user = {
        name,
        password,
        email
    }
    User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            resp.json({
                ok: false,
                message: 'Usuario no encontrado'
            });
            return;
        }

        const userToken = Token.getToken({
                _id: userDB?._id,
                name: userDB?.name,
                password: userDB?.password,
                email: userDB?.email
            });
            resp.json({
                ok: true,
                userToken
        });
    });
    

});

export default userRoutes;