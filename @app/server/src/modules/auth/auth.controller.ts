import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../utils/prisma';
import { LoginInput } from './auth.schema';

const authController = {
    loginHandler: async function (req: FastifyRequest<{ Body: LoginInput }>, res: FastifyReply) {
        try {
            const { email, password } = req.body;

            // find a user by email
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.code(401).send({
                    message: 'Invalid email ',
                });
            }

            // verify password
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.code(401).send({
                    message: 'Invalid password',
                });
            }

            const accessToken = req.jwt.sign({ userId: user.userId, email: user.email });

            // Use the setCookie method provided by the cookie plugin
            res.setCookie('accessToken', accessToken, {
                maxAge: 60 * 60 * 24 * 7,
            });

            return res.send({
                message: 'Login successful',
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.code(500).send(error);
        }
    },

    logoutHandler: async function (req: FastifyRequest, res: FastifyReply) {
        try {
            res.clearCookie('accessToken', {
                maxAge: 0,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            return res.code(200).send({
                message: 'Logout successful',
            });
        } catch (error) {
            console.error('Logout error:', error);
            return res.code(500).send(error);
        }
    },
};

export default authController;