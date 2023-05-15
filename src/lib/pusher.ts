import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  appId: process.env.PUSHER_APP_ID!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    channelAuthorization: { endpoint: "/api/pusher/auth", transport: "ajax" },
    cluster: "ap2",
  }
);
