import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { ApiError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();
// Use the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Register a new user
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otpToken.create({
      data: {
        userId: user.id,
        token: otp,
        expiresAt: otpExpiry,
      },
    });

    // Send verification email
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@foodoscope.com",
        to: email,
        subject: "Verify your email",
        html: `<p>Your verification code is: <strong>${otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>`,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue with registration even if email fails
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify email with OTP
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, otp } = req.body;

    const otpRecord = await prisma.otpToken.findFirst({
      where: {
        userId,
        token: otp,
      },
    });

    if (!otpRecord) {
      throw new ApiError(400, "Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new ApiError(400, "OTP has expired");
    }

    // Mark user as verified
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    // Delete used OTP
    await prisma.otpToken.delete({
      where: { id: otpRecord.id },
    });

    // Generate token for the user
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }

    if (!user.isVerified) {
      throw new ApiError(400, "Please verify your email first");
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
