import { HandlerContext } from "$fresh/server.ts";
import { getLatestUrl } from "../../src/latestUrl.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = new URL(req.url);
  let newPath = url.pathname;
  if (newPath.startsWith("/go")) {
    newPath = url.pathname.replace("/go", "/");
  }
  const urls = await getLatestUrl();
  return Response.redirect(urls.urls[0] + newPath + url.search, 307);
};
