// examples/create-invoice.ts
import { GlanceClient } from "@glance/sdk";

const glance = new GlanceClient({
  apiKey: process.env.GLANCE_API_KEY!,
});

async function createInvoice() {
  const { data: invoice } = await glance.documents.create("invoice", {
    clientId: "C-001",
    products: [
      {
        description: "Web Development Services",
        units: 40,
        price: 150,
        typeOfUnit: "hours",
      },
      {
        description: "Hosting (Monthly)",
        units: 1,
        price: 29.99,
      },
    ],
    payments: [
      {
        amount: 6029.99,
        paymentMethod: "bankTransfer",
      },
    ],
    notes: "Payment due within 30 days",
    sendToClient: true,
  });

  console.log(`Invoice created: ${invoice.visibleId}`);
  console.log(`Total: ${invoice.totalWithTax}`);
}

createInvoice();
