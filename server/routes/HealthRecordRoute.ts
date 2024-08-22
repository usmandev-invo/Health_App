import express from 'express';
import HealthRecordController from '../controllers/HealthRecordController';
import validateRequest from '../middlewares/validate';
import { HealthRecordSchemaValidation } from '../validations/HealthRecordValidation';

const router = express.Router();

router
	.route('/health-records')
	.post(
		validateRequest(HealthRecordSchemaValidation),
		HealthRecordController.createHealthRecord
	)
	.get(HealthRecordController.getHealthRecord);

export default router;
