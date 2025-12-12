import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-must-be-changed-in-production';
const JWT_EXPIRE_IN = '1d';

// Create JWT Object has methods
export const jsonwebtoken = {
  sign: (payload) => {
    try{
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
    } catch(e){
      logger.error(' Failed to authenticate the token ', e);
      throw new Error(' Failed to authenticate the token ' );
    }
  },

  verify: (token) => {
    try{
      return jwt.verify(token, JWT_SECRET);
    } catch(e){
      logger.error(' Failed to authenticate the token ', e);
      throw new Error(' Failed to authenticate the token ' );
    }
  }
};