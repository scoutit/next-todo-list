import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `TodoListData-${timestamp}.json`;
    const saveDir = path.resolve(
      process.env.HOME || "",
      "Practice/NextPractice/saved_data"
    );
    await fs.mkdir(saveDir, { recursive: true });
    const filePath = path.join(saveDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true, file: fileName });
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
