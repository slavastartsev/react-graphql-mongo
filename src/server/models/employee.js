import mongoose, { Schema } from 'mongoose';

const EmployeeSchema = new Schema({
  name: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
});

export default mongoose.model('employee', EmployeeSchema);
