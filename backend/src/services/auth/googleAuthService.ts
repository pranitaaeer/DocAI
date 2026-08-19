import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const getGoogleAuthUrl = (): string => {
  return client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
    prompt: "select_account",
  });
};

export const getGoogleUser = async (code: string) => {
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Unable to get Google user information");
  }

  return {
    googleId: payload.sub,
    name: payload.name || "Google User",
    email: payload.email!,
    picture: payload.picture,
  };
};