import mongoose from './mongoose';
import user from './user';

const formSchema = new Mongoose({
  title: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Form", formSchema);