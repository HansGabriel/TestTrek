import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import { env } from "../../env/server.mjs";
import { Webhook } from "svix";

const webhookSecret = env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: any;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers);
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }
  const { id } = evt.data;

  const eventType = evt.type;
  if (eventType === "user.created") {
    console.log(`User ${id} was ${eventType}`);
    res.status(201).json({});
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
