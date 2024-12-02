import * as OneSignal from '@onesignal/node-onesignal'

const configuration = OneSignal.createConfiguration({
  restApiKey: process.env['API_KEY']!,
})
export const OneSignalClient = new OneSignal.DefaultApi(configuration)
