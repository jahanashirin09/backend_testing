import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import app from "../index";

describe("API Routes", () => {
  it("should return 200  home page on GET /user", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.text).toContain("<h1>home</h1>");
  });
  it("should return 404 error on GET other routes", async () => {
    const response = await request(app).get("/*");
    expect(response.status).toBe(404);
    expect(response.text).toContain("<h1>404 Error</h1>");
  });
});
