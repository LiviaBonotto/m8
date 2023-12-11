import mongoose, { Document, Schema } from 'mongoose';

interface Log extends Document {
  message: string;
}

const LogSchema = new Schema({
  message: { type: String, required: true },
});

const LogModel = mongoose.model<Log>('Log', LogSchema);

export default LogModel;
