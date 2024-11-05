import { describe, it, expect, vi } from 'vitest';
import { create } from '../controllers/createDetails'

vi.mock('../controllers/create_data', () => ({
  default: vi.fn(),
}));


const mockReq = (body) => ({
  body,
});

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('create function', () => {
  it('should return a 400 error if required fields are missing', async () => {
    const req = mockReq({
      PersonID: '1',
      FirstName: 'John',
      LastName: 'Doe',
      Address: '123 Main St',
      City: 'New York',
      Username: 'johndoe',
    
    });
    const res = mockRes();
    
    await create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Please provide all required fields',
    });
  });

  it('should call data function and return 201 when all fields are present', async () => {
    const req = mockReq({
      PersonID: '1',
      FirstName: 'John',
      LastName: 'Doe',
      Address: '123 Main St',
      City: 'New York',
      Username: 'johndoe',
      Password: 'password123',
    });
    const res = mockRes();
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: 'Details created successfully',
    })
  });
});
