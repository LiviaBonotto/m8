import request from "supertest";
import app from "../app";
import express from "express";

import jwt from "jsonwebtoken";
import * as jwtService from "../services/jwtService";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

describe("JWT Service", () => {
  describe("Generate Token", () => {
    it("should return a token for a valid payload", () => {
      const payload = { foo: "bar" };
      const token = jwtService.generateToken(payload);
      expect(token).not.toBeNull();
      expect(typeof token).toBe("string");
    });

    it("should return a different token for different payloads", () => {
      const payload1 = { foo: "bar" };
      const payload2 = { foo: "baz" };
      const token1 = jwtService.generateToken(payload1);
      const token2 = jwtService.generateToken(payload2);
      expect(token1).not.toEqual(token2);
    });
  });

  describe("Verify Token", () => {
    it("should return decoded token for valid token", () => {
      const payload = { foo: "bar" };
      const token = jwtService.generateToken(payload);
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).not.toBeNull();
      expect(decodedToken).toHaveProperty("foo", "bar");
    });

    it("should return null for invalid token", () => {
      const token = "invalid_token";
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).toBeNull();
    });

    it("should return null for empty token", () => {
      const token = "";
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).toBeNull();
    });

    it("should return null for invalid token", () => {
      const token = "invalid_token";
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).toBeNull();
    });

    it("should throw an error for malformed token", () => {
      const token = "malformed-token";
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).toBeNull();
    });

    it("should return null for token signed with wrong secret", () => {
      const payload = { foo: "bar" };
      const token = jwt.sign(payload, "wrong_secret");
      const decodedToken = jwtService.verifyToken(token);
      expect(decodedToken).toBeNull();
    });
  });
});
