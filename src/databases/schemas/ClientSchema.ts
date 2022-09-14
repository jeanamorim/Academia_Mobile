export const ClientSchema = {
  name: "cliente",

  properties: {
    _id: "string",
    name: "string",
    cellPhone: "string",
    description: "string",
    created_at: "date"
  },

  primaryKey: "_id",
}