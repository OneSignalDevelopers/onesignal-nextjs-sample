import { OneSignalClient } from '@/pages/api/common/onesignal'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const body = JSON.parse(req.body)
    const apiRes = await OneSignalClient.createNotification({
      app_id: '',
      include_aliases: { external_id: [body.subscriptionId] },
      contents: {
        en: "You've been notified!",
      },
    })

    res
      .status(200)
      .send({ message: `Notification ${apiRes.id} sent to user ${''}` })
  } catch (err) {
    console.error(`Fatal error - ${err}`)
    res.status(500).send({ message: JSON.stringify(err) })
  }
}
