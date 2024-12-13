import CRUDManager from "../CRUDManager.mjs";
import Car from "./Vehicle.mjs";

class CarsDBService extends CRUDManager {
  async getList(
    filters = {},
    projection = null,
    options,
    populateFields = [],
    skipNum = 0,
    limitNum = 4
  ) {
    try {
      let query = this.model.find(filters, projection, options);
      const count = await this.model.countDocuments(query);
      query.skip(skipNum);
      query.limit(limitNum);
      populateFields.forEach((field) => {
        // query = query.populate(field)
        if (typeof field === "string") {
          // Якщо поле передано як рядок
          query = query.populate(field);
        } else if (
          typeof field === "object" &&
          field.fieldForPopulation &&
          field.requiredFieldsFromTargetObject
        ) {
          // Якщо передано об'єкт з полем для заповнення та запитуваними полями
          query = query.populate(
            field.fieldForPopulation,
            field.requiredFieldsFromTargetObject
          );
        }
      });
      const results = await query.exec();

      return { results, count };
    } catch (error) {
      throw new Error("Error retrieving data: " + error.message);
    }
  }
}
export default new CarsDBService(Car);
