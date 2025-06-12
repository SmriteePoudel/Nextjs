import { NextResponse } from "next/server";

// GET handler for single category
export async function GET(request, { params }) {
  return Promise.resolve()
    .then(async () => {
      const { id } = await params;
      return NextResponse.json(
        {
          message: "Category retrieved successfully",
          category: { id },
        },
        { status: 200 }
      );
    })
    .catch((error) => {
      return NextResponse.json(
        {
          message: "Error retrieving category",
          error: error.message,
        },
        { status: 500 }
      );
    });
}
// ... existing code ...
