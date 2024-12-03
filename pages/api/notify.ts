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
    const apiRes = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env['API_KEY']}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        app_id: process.env['NEXT_PUBLIC_APP_ID'],
        target_channel: 'push',
        name: 'Test notification',
        headings: {
          en: '👋🏽',
        },
        contents: {
          en: 'Hey there',
        },
        include_subscription_ids: [body.subscriptionId],
      }),
    })

    const d = await apiRes.json()
    return res
      .status(200)
      .send({ message: `API response data ${JSON.stringify(d)}` })
  } catch (err) {
    console.error(`Fatal error - ${err}`)
    res.status(500).send({ message: JSON.stringify(err) })
  }
}
