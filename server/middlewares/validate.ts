import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateRequest = (schema: Joi.ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({
				message: 'Invalid request data',
				details: error.details
			});
		}

		next();
	};
};

export default validateRequest;
