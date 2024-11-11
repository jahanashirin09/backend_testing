import { describe, it, expect, vi } from "vitest";
import { login } from "../controllers/loginDetails";
import db from "../config/database";
import jwt from "jsonwebtoken";

describe("login function", () => {
  it("should return 400 if username or password is missing", async () => {
    const req = { body: {} };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Username and Password are required",
    });
  });

  it("should return 401 if invalid username or password", async () => {
    const req = { body: { Username: "wrongUser", Password: "wrongPass" } };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    vi.spyOn(db, "query").mockResolvedValue([[]]);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Login failed: invalid username or password",
    });
  });

  it("should return 200 and token if credentials are valid", async () => {
    const req = { body: { Username: "summayya", Password: "summayya234" } };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    const mockData = [[{ PersonID: 1, FirstName: "John Doe" }]];
    vi.spyOn(db, "query").mockResolvedValue(mockData);

    vi.spyOn(jwt, "sign").mockReturnValue("mockToken");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: "logged successfully",
      token: "mockToken",
    });
  });
});
