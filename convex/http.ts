import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import {internal} from "./_generated/api"
const validatePayLoad = async (
  req: Request
): Promise<WebhookEvent | void | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webHook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("Clerk error with the request", error);
    return;
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayLoad(req);
  if (!event) {
    return new Response("Could not validated clerk payload", { status: 400 });
  }


  switch(event.type) {
    case("user.created"):
        const user = await ctx.runQuery(internal.user.get, {clerkId: event.data.id})
        if (user) {
            console.log(`updating user ${event.data.id} with ${event.data}`)
        }

        case "user.updated": {
            console.log("Creating/Updating User:", event.data.id);
          
            await ctx.runMutation(internal.user.create, {
              username: `${event.data.first_name} ${event.data.last_name}`,
              imageUrl: event.data.image_url,
              clerkId: event.data.id,
              email: event.data.email_addresses[0].email_address,
            });
          
            break;
          }
          default: {
            console.log("Clerk webhook event not supported", event.type);
          }    
  }

  return new Response (null, {
    status: 200
  })
  
});

const http = httpRouter();

http.route({
    path:"/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook
})

export default http;