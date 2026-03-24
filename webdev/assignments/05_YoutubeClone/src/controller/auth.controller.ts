import { Request, Response } from "express";
import { authService } from "../services/auth.service";

const singup = async (req: Request, res: Response) => {
  authService.signup();
};

const signin = async (req: Request, res: Response) => {
  authService.signin("message this");
};

export const authController = {
  singup,
  signin,
};
