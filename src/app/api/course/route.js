import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

// GET handler
export async function GET() {
  try {
    // Connect to database first
    await connectDB();

    // Fetch all courses
    const courses = await Course.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Courses retrieved successfully",
        courses: courses || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        message: "Error retrieving courses",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    // Connect to database first
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.price) {
      return NextResponse.json(
        {
          message: "Title and price are required",
        },
        { status: 400 }
      );
    }

    // Validate price is a number
    if (isNaN(body.price) || body.price <= 0) {
      return NextResponse.json(
        {
          message: "Price must be a positive number",
        },
        { status: 400 }
      );
    }

    // Create new course
    const newCourse = new Course({
      title: body.title.trim(),
      price: Number(body.price),
      description: body.description ? body.description.trim() : "",
    });

    // Save the course
    const savedCourse = await newCourse.save();

    if (!savedCourse) {
      throw new Error("Failed to create course");
    }

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: savedCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      {
        message: "Error creating course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
