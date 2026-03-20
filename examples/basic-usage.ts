// examples/basic-usage.ts
import { GlanceClient, GlanceApiError } from "@glance/sdk";

const glance = new GlanceClient({
  apiKey: process.env.GLANCE_API_KEY!,
});

async function main() {
  // List clients
  const { data: clients, pagination } = await glance.clients.list({
    search: "acme",
    limit: 10,
  });
  console.log(`Found ${pagination.total} clients`);

  // Get a specific client
  const { data: client } = await glance.clients.get("C-001");
  console.log(`Client: ${client.name}`);

  // Create a product
  const { data: product } = await glance.products.create({
    name: "Widget",
    sku: "WDG-001",
    unitCost: 25.00,
    isPhysical: true,
  });
  console.log(`Created product: ${product.sku}`);

  // Error handling
  try {
    await glance.clients.get("non-existent");
  } catch (error) {
    if (error instanceof GlanceApiError) {
      console.error(`API Error ${error.status}: ${error.message} (${error.code})`);
    }
  }
}

main();
