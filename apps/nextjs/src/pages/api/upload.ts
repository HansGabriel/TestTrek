import formidable from "formidable";
import cloudinary from "../../services/cloudinary";

import type { NextApiHandler } from "next";
import type { ImageDetails } from "@acme/schema/src/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send(err);
    }

    try {
      const testImages: ImageDetails[] = [];

      const { testImage } = files;

      if (!testImage) {
        return res.status(400).send("No image provided");
      }

      for (const file of testImage) {
        const result = await cloudinary.uploader.upload(file.filepath);

        const { secure_url: secureUrl, public_id: publicId } = result;

        const imageResult: ImageDetails = {
          publicId,
          secureUrl,
        };

        testImages.push(imageResult);
      }

      res.status(200).send(testImages);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};

export default handler;
