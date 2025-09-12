import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { prisma } from "../../src/lib/prisma";

function generateDatabaseUrl(schema: string) {
  const base = process.env.DATABASE_URL;
  if (!base) {
    throw new Error("DATABASE_URL não definida");
  }
  const url = new URL(base);
  url.searchParams.set("schema", schema);
  return url.toString();
}

let created = false;

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    if (process.env.NODE_ENV && process.env.NODE_ENV !== "test") {
      throw new Error("Ambiente Prisma de teste usado fora de NODE_ENV=test");
    }

    const originalDbUrl = process.env.DATABASE_URL;

    const workerId = process.env.VITEST_WORKER_ID || "0";
    const schemaBase = `test_w${workerId}`;
    const schema = `${schemaBase}_${randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)}`;

    const databaseUrl = generateDatabaseUrl(schema);
    process.env.DATABASE_URL = databaseUrl;

    if (!created) {
      execSync("npx prisma db push --skip-generate", {
        stdio: "inherit",
        env: { ...process.env, DATABASE_URL: databaseUrl },
      });
      created = true;
    }

    return {
      async teardown() {
        try {
          await prisma.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
          );
        } catch (e) {
          console.error("Falha ao dropar schema de teste:", e);
        } finally {
          await prisma.$disconnect();
          if (originalDbUrl) {
            process.env.DATABASE_URL = originalDbUrl;
          }
        }
      },
    };
  },
};
