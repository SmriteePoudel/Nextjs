import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import mongoose from "mongoose";

// GET handler for single course
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid course ID format",
        },
        { status: 400 }
      );
    }

    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course retrieved successfully",
        course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving course:", error);
    return NextResponse.json(
      {
        message: "Error retrieving course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PATCH handler for updating course
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid course ID format",
        },
        { status: 400 }
      );
    }

    // Find and update the course
    const course = await Course.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course updated successfully",
        course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      {
        message: "Error updating course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
