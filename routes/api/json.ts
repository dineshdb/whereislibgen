import { HandlerContext } from "$fresh/server.ts";
import { getLatestUrl } from "../../src/latestUrl.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await getLatestUrl();
  return new Response(JSON.stringify(body));
};
