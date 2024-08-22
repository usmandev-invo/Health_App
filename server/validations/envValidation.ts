import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().uri().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export { envVars };
