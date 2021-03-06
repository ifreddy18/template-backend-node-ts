import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../db/models';
import { generateJWT } from '../helpers/generate-jwt';

export const login = async( req: Request, res: Response ): Promise<void> => {

    const { email, password } = req.body

	try {
		// Verify if user exist by email
		const user = await User.findOne({ where: { email } });

		if ( !user ) {
			res.status(400).json({
		    	msg: 'Wrong email or password'
			});
            return;
		}

		// Verify if user is active (status === 1)
		if ( user.status !== 1 ) {
			res.status(400).json({
				msg: 'Wrong email or password'
			});
            return;
		}

		// Verify password
		const validPassword = bcrypt.compareSync(password, user.password);
		if ( !validPassword ) {
            res.status(400).json({
                msg: 'Wrong email or password'
            });
            return;
		}

		// Generar el JWT
		const token = await generateJWT({
            uid: user.uid,
        });

		res.status(200).json({ user, token });

	} catch(error) {
		console.log(error);
		res.status(500).json({ msg: 'Talk to the admin' });
	}
};

export const getAuthState = async(req: Request, res: Response): Promise<void> => {
	const {uid, email, name } = req.user;
	res.status(200).json({ uid, email, name });
};