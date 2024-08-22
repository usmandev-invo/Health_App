import { Schema, model } from 'mongoose';
import { HealthRecord } from '../Interfaces/HealthRecord';
import { timeStamp } from 'console';

const HealthRecordSchema = new Schema<HealthRecord>({
	userId: { type: String, required: true, default: 'staticUserId' },
	date: { type: Date, required: true },
	steps: { type: Number, required: true },
	hoursOfSleep: { type: Number, required: true }
},  {
	timestamps: true, 
  });

const HealthRecordModel = model<HealthRecord>(
	'HealthRecord',
	HealthRecordSchema
);

export default HealthRecordModel;
