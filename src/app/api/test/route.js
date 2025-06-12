import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    // Test the connection
    const isConnected = mongoose.connection.readyState === 1;
    const connectionState = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    }[mongoose.connection.readyState];

    return NextResponse.json({
      message: "Database connection test",
      isConnected,
      connectionState,
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      models: Object.keys(mongoose.models),
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        message: "Database connection failed",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
