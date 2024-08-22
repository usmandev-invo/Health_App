import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import HealthRecordRoutes from './routes/HealthRecordRoute';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { envVars } from './validations/envValidation';
import fs from 'fs';
import path from 'path';
export const app = express();
const port = envVars.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();

const swaggerDocument = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, './utils/swagger.json'), 'utf8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', HealthRecordRoutes);

app.get('/api/health-check', (req, res) => {
	res.send('Backend APIs are working!');
});
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
