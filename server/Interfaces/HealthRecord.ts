import { Document } from 'mongoose';

export interface HealthRecord extends Document {
	userId: string;
	date: Date;
	steps: number;
	hoursOfSleep: number;
}

export interface CreateHealthRecordDTO {
	date: Date;
	steps: number;
	hoursOfSleep: number;
}
