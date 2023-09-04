import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.test.create({
    data: {
      title: "Sample Title",
      collection: "Sample Collection",
      description: "Sample Description",
      imageUrl: "https://sample.com/image.jpg",
      keywords: {
        create: [{ name: "keyword1" }, { name: "keyword2" }],
      },
      visibility: "public", // Adjust according to enum or type
      userId: "sample-user-id",
    },
  });

  //To seed multiple entries, use a loop or multiple `create` calls.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
