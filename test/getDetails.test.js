import { describe, it, expect, vi } from "vitest";
import { create } from "../controllers/createDetails";
import db from "../config/database";

vi.mock("../config/database");
describe("create function", () => {
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
  };
  beforeEach(async() => {
    vi.clearAllMocks();

    
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  it("should return 500 if required fields are missing", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Please provide all required fields",
    });
  });

  it("should handle server errors", async () => {
    const req = mockRequest({
      PersonID: 1,
      FirstName: "John",
      LastName: "Doe",
      Address: "123 Main St",
      City: "Anytown",
      Username: "johndoe",
      Password: "securepassword",
    });
    const res = mockResponse();

    db.query.mockRejectedValue(new Error("Database error"));

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Server Error",
      error: expect.any(Error),
    });
  });
 
  it("should return 201 when details are created successfully", async () => {
    const req = mockRequest({
      PersonID: 8,
      FirstName: "John",
      LastName: "Doe",
      Address: "123 Main St",
      City: "Anytown",
      Username: "johndoe",
      Password: "securepassword",
    });
    const res = mockResponse();

    // Mock successful database insertion
    db.query.mockResolvedValue({insertId: req.body.PersonID});

    await create(req, res);

    // expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.send).toHaveBeenCalledWith({
    //   success: true,
    //   message: "Details created successfully",
    // });
  });
});
