import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error.middleware";

const prisma = new PrismaClient();

/**
 * Get user profile
 */
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        age: true,
        location: true,
        height: true,
        weight: true,
        goalWeight: true,
        goals: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Update user profile
 */
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { name, gender, age, location, height, weight, goalWeight, goals } =
      req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        gender,
        age: age ? parseInt(age) : undefined,
        location,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        goalWeight: goalWeight ? parseFloat(goalWeight) : undefined,
        goals,
      },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        age: true,
        location: true,
        height: true,
        weight: true,
        goalWeight: true,
        goals: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create user profile
 */
export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { name, gender, age, location, height, weight, goalWeight, goals } =
      req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        gender,
        age: age ? parseInt(age) : undefined,
        location,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        goalWeight: goalWeight ? parseFloat(goalWeight) : undefined,
        goals,
      },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        age: true,
        location: true,
        height: true,
        weight: true,
        goalWeight: true,
        goals: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
