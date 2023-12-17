import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import { userWebhookSchema } from "@acme/schema/src/user";
import { env } from "../../env/server.mjs";
import { prisma } from "@acme/db";
import { Webhook } from "svix";
import { updateUserInAlgolia } from "./algoliaUserHandler";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const webhookSecret = env.WEBHOOK_SECRET;
  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const firstName = first_name.trim().replaceAll(/\s+/g, "_").toLowerCase();
    const lastName = last_name?.trim()?.replaceAll(/\s+/g, "_")?.toLowerCase();

    let username = firstName;

    if (lastName) {
      username = `${firstName}_${lastName}`;
    }

    await prisma.user.upsert({
      create: {
        email: email,
        firstName: first_name,
        lastName: last_name ?? "",
        userId: id,
        imageUrl: image_url,
        username: username,
      },
      update: {
        email: email,
        firstName: first_name,
        lastName: last_name ?? "",
        userId: id,
        imageUrl: image_url,
        username: username,
      },
      where: {
        userId: id,
      },
    });

    res.status(201).json({
      message: "User created",
    });

    const userForAlgolia = await prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        id: true,
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (userForAlgolia !== null) {
      try {
        await updateUserInAlgolia(userForAlgolia);
      } catch (error) {
        console.error(`Error adding user to Algolia: `, error);
        console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
      }
    }
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
//
