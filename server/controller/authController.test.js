// ...existing code...
import { register, login } from "./authController.js";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";

jest.mock("../models/userModal.js", () => {
  return {
    __esModule: true,
    default: jest.fn(), // mock constructor
    findOne: jest.fn(),
  };
});
jest.mock("jsonwebtoken");
// ...existing code...

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("register - success returns 201 and user without password", async () => {
  const req = {
    body: {
      name: "Alice",
      email: "alice@example.com",
      password: "plainpass",
      role: "PATIENT",
    },
  };

  const savedUser = {
    _id: "uid123",
    name: "Alice",
    email: "alice@example.com",
    password: "hashed",
    toObject: function () {
      return { _id: this._id, name: this.name, email: this.email, password: this.password };
    },
  };

  // mock constructor -> instance with save()
  userModal.mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(savedUser),
  }));

  const res = mockRes();

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
  const payload = res.json.mock.calls[0][0];
  expect(payload.message).toBe("User registered successfully");
  expect(payload.user).toBeDefined();
  expect(payload.user.password).toBeUndefined();
  expect(payload.user.email).toBe("alice@example.com");
});

test("login - success returns token and 200", async () => {
  const req = { body: { email: "bob@example.com", password: "secret" } };

  const foundUser = {
    _id: "uid456",
    name: "Bob",
    email: "bob@example.com",
    password: "hashed",
    comparePassword: jest.fn().mockResolvedValue(true),
    toObject: function () {
      return { _id: this._id, name: this.name, email: this.email, password: this.password };
    },
  };

  // mock static findOne
  userModal.findOne = jest.fn().mockResolvedValue(foundUser);
  jwt.sign.mockReturnValue("signed-token");

  const res = mockRes();

  await login(req, res);

  expect(userModal.findOne).toHaveBeenCalledWith({ email: "bob@example.com" });
  expect(foundUser.comparePassword).toHaveBeenCalledWith("secret");
  expect(jwt.sign).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  const payload = res.json.mock.calls[0][0];
  expect(payload.token).toBe("signed-token");
  expect(payload.message).toBe("Login successful");
});

test("login - invalid password returns 400", async () => {
  const req = { body: { email: "bob@example.com", password: "wrong" } };

  const foundUser = {
    _id: "uid456",
    name: "Bob",
    email: "bob@example.com",
    password: "hashed",
    comparePassword: jest.fn().mockResolvedValue(false),
  };

  userModal.findOne = jest.fn().mockResolvedValue(foundUser);

  const res = mockRes();

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  const payload = res.json.mock.calls[0][0];
  expect(payload.message).toBe("Invalid email or password");
});
