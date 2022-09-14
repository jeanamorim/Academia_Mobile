export const ScheduleSchema = {
  name: "schedule",

  properties: {
    _id: "string",
    cliente_id: "string",
    name: "string",
    date: "string",
    hours: "string",
    exercise: "string",
    status: "string",
    created_at: "date"
  },

  primaryKey: "_id",
}