import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import HealthRecordModel from "../models/HealthRecord";
import HealthRecordController from "../controllers/HealthRecordController";
import validateRequest from "../middlewares/validate";
import { HealthRecordSchemaValidation } from "../validations/HealthRecordValidation";
import { envVars } from "../validations/envValidation";

const app = express();
app.use(express.json());

app.post(
  "/health-records",
  validateRequest(HealthRecordSchemaValidation),
  HealthRecordController.createHealthRecord
);
app.get("/health-records", HealthRecordController.getHealthRecord);

beforeAll(async () => {
  await mongoose.connect(envVars.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Health Records API", () => {
  it("should create a new health record", async () => {
    const response = await request(app).post("/health-records").send({
      date: new Date().toISOString(),
      steps: 10000,
      hoursOfSleep: 8,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.steps).toBe(10000);
    expect(response.body.hoursOfSleep).toBe(8);
  });

  it("should retrieve health records", async () => {
    await HealthRecordModel.create({
      userId: "testUserId",
      date: new Date(),
      steps: 5000,
      hoursOfSleep: 6,
    });

    const response = await request(app).get("/health-records");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("userId");
    expect(response.body[0]).toHaveProperty("steps");
    expect(response.body[0]).toHaveProperty("hoursOfSleep");
  });
});
