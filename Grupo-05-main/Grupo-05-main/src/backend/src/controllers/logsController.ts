import { Request, Response } from 'express';
import Log from '../models/Log'; 

export const createLog = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const log = new Log({ message });
    await log.save();
    res.status(201).json({ success: true, log });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await Log.find();
    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
