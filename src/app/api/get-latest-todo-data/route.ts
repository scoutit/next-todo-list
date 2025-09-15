import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const saveDir = path.resolve(
      process.env.HOME || "",
      "Practice/NextPractice/saved_data"
    );
    const files = await fs.readdir(saveDir);
    const todoFiles = files.filter(
      (f) => f.startsWith("TodoListData-") && f.endsWith(".json")
    );
    if (todoFiles.length === 0) {
      return NextResponse.json(
        { success: false, message: "No saved data found." },
        { status: 404 }
      );
    }
    // Sort files by timestamp descending
    todoFiles.sort((a, b) => b.localeCompare(a));
    const latestFile = todoFiles[0];
    const filePath = path.join(saveDir, latestFile);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContents);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
