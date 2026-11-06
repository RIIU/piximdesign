import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Leave preview mode and go back to the live site.
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
