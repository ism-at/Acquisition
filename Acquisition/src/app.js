// Express application setup with security, logging, CORS, and basic routing
import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Add security-related HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests using morgan and winston
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Initial startup log message
logger.info('Server is initializing...');

// Basic health-check route
app.get('/', (req, res) => {
  res.status(200).send('Server is up and running');
});

export default app;
