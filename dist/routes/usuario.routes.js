"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRoutes = express_1.Router();
//Login
userRoutes.post('/signin', (req, resp) => {
    const { email, password } = req.body;
    user_model_1.User.findOne({ email: email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.comparePassword(password)) {
            const userToken = token_1.default.getToken({
                _id: userDB._id,
                name: userDB.name,
                password: userDB.password,
                email: userDB.email
            });
            resp.json({
                ok: true,
                userToken
            });
        }
        else {
            resp.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }
    });
});
//Insert User
userRoutes.post('/create', (req, resp) => {
    const { name, email, password, avatar } = req.body;
    const user = {
        name,
        email,
        password: bcrypt_1.default.hashSync(password, 10),
        avatar
    };
    user_model_1.User.create(user)
        .then(userDB => {
        const userToken = token_1.default.getToken({
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
userRoutes.post('/update', auth_middleware_1.verifyToken, (req, resp) => {
    const { name, password, email } = req.body || req.user;
    const user = {
        name,
        password,
        email
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            resp.json({
                ok: false,
                message: 'Usuario no encontrado'
            });
            return;
        }
        const userToken = token_1.default.getToken({
            _id: userDB === null || userDB === void 0 ? void 0 : userDB._id,
            name: userDB === null || userDB === void 0 ? void 0 : userDB.name,
            password: userDB === null || userDB === void 0 ? void 0 : userDB.password,
            email: userDB === null || userDB === void 0 ? void 0 : userDB.email
        });
        resp.json({
            ok: true,
            userToken
        });
    });
});
exports.default = userRoutes;
