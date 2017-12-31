import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  // contributors: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'employee',
  //   },
  // ],
});

export default mongoose.model('project', ProjectSchema);
