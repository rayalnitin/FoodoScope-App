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

/**
 * Forgot password - send reset code
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      res.status(200).json({
        success: true,
        message: "If an account with that email exists, we've sent a reset code",
      });
      return;
    }

    // Generate reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Delete any existing reset codes for this user
    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    // Create new reset code
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetCode,
        expiresAt: resetCodeExpiry,
      },
    });

    // Send reset code via email
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@foodoscope.com",
        to: email,
        subject: "Reset Your Password",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Reset Your Password</h2>
                <p>We received a request to reset your password for your FoodScope account.</p>
                <p>Your password reset code is: <strong>${resetCode}</strong></p>
                <p>This code will expire in 30 minutes.</p>
                <p>If you didn't request a password reset, you can safely ignore this email.</p>
              </div>`,
      });
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      // Continue even if email fails, to not give away user existence
    }

    res.status(200).json({
      success: true,
      message: "If an account with that email exists, we've sent a reset code",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password using code
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset code");
    }

    // Verify reset code
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        userId: user.id,
        token: resetCode,
      },
    });

    if (!resetRecord) {
      throw new ApiError(400, "Invalid or expired reset code");
    }

    if (resetRecord.expiresAt < new Date()) {
      throw new ApiError(400, "Reset code has expired");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Delete used reset code
    await prisma.passwordReset.delete({
      where: { id: resetRecord.id },
    });

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
