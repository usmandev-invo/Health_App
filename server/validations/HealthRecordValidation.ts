import Joi from 'joi';

export const HealthRecordSchemaValidation = Joi.object({
	date: Joi.date().iso().required(),
	steps: Joi.number().integer().min(0).required(),
	hoursOfSleep: Joi.number().min(0).max(24).required()
});
