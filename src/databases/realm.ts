import Realm from 'realm';
import { ClientSchema } from './schemas/ClientSchema';
import { ScheduleSchema } from './schemas/newSchedule';

export const getRealm = async () => await Realm.open({
  path: "scheduling-app1",
  schema: [ClientSchema, ScheduleSchema]
});