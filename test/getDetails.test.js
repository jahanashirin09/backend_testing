import { describe, it, expect, vi } from "vitest";
import { getStudent } from "../controllers/getDetails";
import db from "../config/database";
import data from "../controllers/get_data";

describe("getStudent function", () => {
  it("should return 200 with the data when details are found", async () => {
    const mockData = [
      {
        PersonID: 1,
        FirstName: "John",
        LastName: "Doe",
        Address: "123 Main St",
        City: "New York",
        Username: "johndoe",
        Password: "password123",
      },
    ];
    vi.spyOn(db, "query").mockResolvedValue([mockData]);
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    await getStudent(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  
  it("should return 404 if No details found", async () => {
    vi.spyOn(db, "query").mockResolvedValue([]);
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    await getStudent(req, res);
    expect(res.status).toHaveBeenCalled(404);
  });
});
