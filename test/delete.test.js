import { describe, it, expect, vi } from 'vitest';
import { deletedetails} from '../controllers/delete'


vi.mock('../controllers/create_data', () => ({
  default: vi.fn(),
}));


const mockReq = (params) => ({
  params,
});

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('delete function', () => {
  it('should return a 400 error for invalid PersonID', async () => {
    const req = mockReq({

    
    });
    const res = mockRes();
    
    await deletedetails(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid PersonID',
    });
  });

  it('should call data function and return 201 when all fields are present', async () => {
    const req = mockReq({
      PersonID: '1'
    });
    const res = mockRes();
    await deletedetails(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: 'Details deleted successfully',
    })
  })
});
