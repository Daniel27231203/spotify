import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookiesStorage = cookies();
  cookiesStorage.delete("spotify_access_token");
  cookiesStorage.delete("spotify_refresh_token");
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
};
