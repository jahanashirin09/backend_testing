import { describe,it,expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import app from '../index';

describe('API Routes', () => {
    it('should return home page on GET /user', async () => {
      const response = await request(app).get('/user');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<h1>home</h1>');
    });
  

  });
  
