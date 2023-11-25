import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "@acme/api";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Testrek CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
});
