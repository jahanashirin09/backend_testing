import { describe, it, expect, vi } from "vitest";
import { verifyToken } from "../controllers/verifyToken";
import jwt from "jsonwebtoken";

describe("verifyToken middleware", () => {
  it("should return 401 if no token is provided", async () => {
    const req = {
      headers: {},
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    const next = vi.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: "no token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if token verification fails", async () => {
    const req = {
      headers: {
        authorization: "Bearer invalid Token",
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    const next = vi.fn();

    vi.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: "authentication failed" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if token verification succeeds", async () => {
    const req = {
      headers: {
        authorization: "Bearer validToken",
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    const next = vi.fn();
    vi.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, username: "testuser" });
    });

    await verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
