// tests/resources/payments.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PaymentsResource } from "../../src/resources/payments";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("PaymentsResource", () => {
  let http: HttpClient;
  let payments: PaymentsResource;

  beforeEach(() => {
    http = createMockHttp();
    payments = new PaymentsResource(http);
  });

  it("charge() calls POST /grow/payments/charge", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await payments.charge({ amount: 100, cardToken: "tok_123" });
    expect(http.post).toHaveBeenCalledWith("/grow/payments/charge", { amount: 100, cardToken: "tok_123" });
  });

  it("refund() calls POST /grow/payments/refund", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await payments.refund({ transactionId: "tx_123", amount: 50, reason: "Customer request" });
    expect(http.post).toHaveBeenCalledWith("/grow/payments/refund", { transactionId: "tx_123", amount: 50, reason: "Customer request" });
  });

  it("listTransactions() calls GET /grow/payments/transactions", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await payments.listTransactions({ startDate: "2026-01-01" });
    expect(http.get).toHaveBeenCalledWith("/grow/payments/transactions", { startDate: "2026-01-01" });
  });

  it("getTransaction() calls GET /grow/payments/transactions/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: "tx_123" } });
    await payments.getTransaction("tx_123");
    expect(http.get).toHaveBeenCalledWith("/grow/payments/transactions/tx_123");
  });
});
