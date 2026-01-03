import mongoose from 'mongoose';

const MappingSchema = new mongoose.Schema({
  uuid: { type: String, unique: true, index: true },
  slug: String,
  type: String
});

export const Mapping = mongoose.models.Mapping || mongoose.model('Mapping', MappingSchema);
