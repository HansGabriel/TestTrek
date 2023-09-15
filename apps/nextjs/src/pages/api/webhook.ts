import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import { userWebhookSchema } from "@acme/schema/src/user";
import { env } from "../../env/server.mjs";
import { prisma } from "@acme/db";
import { Webhook } from "svix";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const webhookSecret = env.WEBHOOK_SECRET;
  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);

  let evt: any;
  try {
    evt = wh.verify(payload, headers);
  } catch (_) {
    return res.status(400).json({
      message: "Invalid webhook payload or headers",
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const userWebhookData = userWebhookSchema.parse(evt.data);
    const { id, email, first_name, last_name, image_url } = userWebhookData;

    const username = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
    await prisma.user.create({
      data: {
        email,
        firstName: first_name,
        lastName: last_name,
        userId: id,
        imageUrl: image_url,
        username: username,
      },
    });
    res.status(201).json({
      message: "User created",
    });
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
