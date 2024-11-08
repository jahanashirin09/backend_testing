import { describe, it, expect, vi } from "vitest";
import { update } from "../controllers/updateDetails";

vi.mock("../controllers/create_data", () => ({
  default: vi.fn(),
}));

const mockReq = (params, body) => ({
  params,
  body,
});

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe("update function", () => {
  it("should return a 400 error for invalid PersonID", async () => {
    const req = mockReq({});
    const res = mockRes();

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "invalid PersonId",
    });
  });

  it("should call data function and return 201 when all fields are present", async () => {
    const req = mockReq(
      {
        PersonID: "1",
      },
      {
        FirstName: "John",
        LastName: "Doe",
        Address: "123 Main St",
        City: "New York",
        Username: "johndoe",
      }
    );
    const res = mockRes();
    await update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: "Details updated successfully",
    });
  });
});
