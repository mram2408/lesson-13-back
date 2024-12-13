import mongoose from "mongoose";
import config from "../../../../config/default.mjs";

const { Schema } = mongoose;

const vehicleSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: [1950, `Рік має бути від 1950 до ${new Date().getFullYear() + 1}`],
    max: [
      new Date().getFullYear() + 1,
      `Рік має бути від 1950 до ${new Date().getFullYear() + 1}`,
    ],
  },
  numberPlate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Z]{2}\d{4}[A-Z]{2}$/.test(v);
      },
      message: (props) => "Номерний знак не відповідає вимогам XX1234XX",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
  price: {
    type: Number,
  },
});

vehicleSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.databaseName);
};

vehicleSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db
      .listCollections({ name: "vehicles" })
      .toArray();
    return collections.length > 0;
  }
  return false;
};

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
