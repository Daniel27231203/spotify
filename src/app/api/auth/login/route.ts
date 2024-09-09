import { NextResponse } from "next/server";
import quarystring from "querystring";

export const GET = () => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "app-remote-control",
    "streaming",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ].join(" ");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUrl = process.env.SPOTIFY_REDIRECT_URI;

  const quaryParams = quarystring.stringify({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUrl,
  });

  const url = `https://accounts.spotify.com/authorize?${quaryParams}`;
  return NextResponse.redirect(url);
};
