import { NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body: Book = await req.json();
    const newBook = await db.insert(books).values(body).returning();
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Create book failed", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: Partial<Book> = await req.json();
    console.log("updateFavorite", body);
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const updatedBook = await db
      .update(books)
      .set(updateData)
      .where(eq(books.id, id))
      .returning();

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Update book failed", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
