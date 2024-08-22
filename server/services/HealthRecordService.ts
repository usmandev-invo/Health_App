import crypto from "crypto";
import {
  CreateHealthRecordDTO,
  HealthRecord,
} from "../Interfaces/HealthRecord";
import HealthRecordModel from "../models/HealthRecord";

class HealthRecordService {
  async createHealthRecord(data: CreateHealthRecordDTO): Promise<HealthRecord> {
    const newRecord = new HealthRecordModel({
      userId: crypto.randomBytes(16).toString("hex"),
      ...data,
    });

    return await newRecord.save();
  }
  async getHealthRecord(): Promise<HealthRecord[]> {
    return await HealthRecordModel.find().exec();
  }
}

export default new HealthRecordService();
