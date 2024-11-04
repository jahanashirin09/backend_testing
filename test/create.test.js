import { describe, it, expect, vi ,beforeEach,afterEach,afterAll} from "vitest";
import { create } from "../controllers/createDetails";
import { deletedetails } from "../controllers/delete";
vi.doMock("../config/database");
import db from "../config/database";



describe("create function", () => {

  beforeEach(async() => {
   
   
  
    db.query = vi.fn();
    vi.clearAllMocks();
  });
  
  afterAll(() => {
    
    vi.restoreAllMocks();
  });
  
  afterEach(async () => {
    try {
   
      const result = await db.query('DELETE FROM Details WHERE PersonID = ?', [12]);
      console.log(`Deleted ${result.affectedRows} rows`); 
    } catch (error) {
      console.error("Error deleting test data:", error);
    }
  });
  


  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
  };
  
  
  it("should return 400 if required fields are missing", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "Please provide all required fields",
    });
  });

  // it("should handle server errors", async () => {

  //   const req = mockRequest({
  //     PersonID: 10,
  //     FirstName: "John",
  //     LastName: "Doe",
  //     Address: "123 Main St",
  //     City: "Anytown",
  //     Username: "johndoe",
  //     Password: "securepassword",
  //   });
  //   const res = mockResponse();
  //   db.query = vi.fn().mockRejectedValueOnce(new Error("Duplicate entry '10' for key 'details.PRIMARY'"));
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith({
  //     success: false,
  //     message: "Server Error",
  //     error: expect.any(String),
  //   });
  // });
 
  it("should create a new entry successfully", async () => {
    
    const req = mockRequest({
      PersonID: 12, 
      FirstName: "John",
      LastName: "Doe",
      Address: "123 Main St",
      City: "Anytown",
      Username: "johndoe",
      Password: "securepassword",
    })
 
    const res = mockResponse()

    await create(req, res);
    const deleteReq = mockRequest({
      PersonID: 12,
    });
    const deleteRes = mockResponse();
    await deletedetails(deleteReq, deleteRes);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ 
      success: true,
      message: "Details created successfully",
    });

  })
  
})
