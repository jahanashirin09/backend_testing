
import { describe, it, expect, beforeEach, vi } from "vitest";
import getStudent from "../controllers/getstudentDetails";
import db from "../config/database";

describe("getStudent", () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    db.query = vi.fn();
    req = {}; // Mock the request object
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    }; // Mock the response object
  });

  it("should return all student details", async () => {
    const mockData = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    db.query.mockResolvedValueOnce(mockData);

    await getStudent(req, res);

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM Details");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ data: mockData });
  });

  it("should return 404 if no details found", async () => {
    db.query.mockResolvedValueOnce([]);

    await getStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "No details found",
    });
  });
});



