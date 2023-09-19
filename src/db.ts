const kv = await Deno.openKv();

const PREFIX = ["urls"];

export type Urls = {
  urls: string[];
  lastUpdated?: Date;
};

export async function getUrls(): Promise<Urls> {
  const res = await kv.get<Urls>(PREFIX);
  return res.value;
}

export async function setUrls(urls: Urls) {
  const lastUpdated = new Date();
  await kv.set(PREFIX, { urls, lastUpdated });
}
