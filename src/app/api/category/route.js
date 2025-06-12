import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

// GET handler
export async function GET() {
  try {
    // Connect to database first
    await connectDB();

    // Fetch all categories
    const categories = await Category.find({}).sort({ createdAt: -1 });

    if (!categories) {
      return NextResponse.json(
        {
          message: "No categories found",
          categories: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Categories retrieved successfully",
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/category:", error);
    return NextResponse.json(
      {
        message: "Error retrieving categories",
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
    if (
      !body.name ||
      typeof body.name !== "string" ||
      body.name.trim() === ""
    ) {
      return NextResponse.json(
        {
          message: "Valid name is required",
        },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: body.name.trim() });
    if (existingCategory) {
      return NextResponse.json(
        {
          message: "Category with this name already exists",
        },
        { status: 400 }
      );
    }

    // Create new category
    const newCategory = new Category({
      name: body.name.trim(),
    });

    // Save the category
    const savedCategory = await newCategory.save();

    return NextResponse.json(
      {
        message: "Category created successfully",
        category: savedCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/category:", error);
    return NextResponse.json(
      {
        message: "Error creating category",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
