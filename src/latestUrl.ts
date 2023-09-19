import { getUrls, setUrls, Urls } from "./db.ts";
import { fetchUrls } from "./utils.ts";

const REFRESH_INTERVAL = Number.parseInt(
  Deno.env.get("REFRESH_INTERVAL") ?? "600",
) * 1000;

export async function getLatestUrl(): Promise<Urls> {
  const urls = await getUrls();
  if (
    !urls || urls.lastUpdated &&
      new Date(urls.lastUpdated).getTime() + REFRESH_INTERVAL < Date.now()
  ) {
    console.info("Fetching latest urls");
    const newUrls = await fetchUrls();
    setUrls(newUrls);
    return { urls: newUrls };
  }

  return urls;
}
