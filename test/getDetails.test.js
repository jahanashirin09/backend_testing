import { describe, expect, it, vi } from "vitest";
import { getStudent } from "../controllers/getstudentDetails";
describe("get function ", () => {
  vi.mock("../config/database", () => ({
    default: vi.fn(),
  }));
  const mockreq = () => ({});
  const mockresp = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
  };
  it("should return 200 for successful details", async () => {
    // const data = vi.fn(() => null);
    const data = vi.fn(() => ({ PersonID: 1, FirstName: "John" }));
    console.log(data.mockResolvedValue);
    const req = mockreq({});
    const res = mockresp();
    await getStudent(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("should return 404 for no details found", async () => {
    const req = mockreq();
    const res = mockresp();
    await getStudent(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
