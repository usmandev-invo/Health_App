import { Request, Response } from 'express';
import HealthRecordService from '../services/HealthRecordService';
import { RECORD_ERROR_MESSAGES, HTTP_STATUS_CODES } from '../constants';

class HealthRecordController {
	async createHealthRecord(req: Request, res: Response) {
		try {
			const { date, steps, hoursOfSleep } = req.body;
			const newRecord = await HealthRecordService.createHealthRecord({
				date,
				steps,
				hoursOfSleep
			});
			res.status(HTTP_STATUS_CODES.CREATE).json(newRecord);
		} catch (error) {
			res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				message: RECORD_ERROR_MESSAGES.RECORD_CREATE_ERROR,
				error
			});
		}
	}
	async getHealthRecord(req: Request, res: Response) {
		try {
			const allRecords = await HealthRecordService.getHealthRecord();
			res.status(HTTP_STATUS_CODES.SUCCESS).json(allRecords);
		} catch (error) {
			res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				message: RECORD_ERROR_MESSAGES.RECORD_FETCH_ERROR,
				error
			});
		}
	}
}

export default new HealthRecordController();
