import { Head } from "$fresh/runtime.ts";
import { getLatestUrl } from "../src/latestUrl.ts";

export default async function Home() {
  let urls;
  try {
    urls = await getLatestUrl();
  } catch (e) {
    return <h1>An Error occurred</h1>;
  }

  const [mainUrl, ...otherUrls] = urls.urls;

  return (
    <>
      <div class="px-4 py-8 h-screen text-gray-800 flex flex-col">
        <main class="max-w-screen-md mx-auto flex flex-col items-center justify-center flex-grow">
          <p class="text-3xl text-gray-500">
            Libgen is currently available at:
          </p>

          <a
            class="text-7xl p-8 text-blue-800 underline decoration-sky-500 hover:bg-sky-200 font-semibold"
            href={mainUrl}
            rel="noopener"
            target="_blank"
          >
            {mainUrl}
          </a>
          <p class="text-2xl">
            <a
              href="/go"
              rel="noopener"
              target="_blank"
              class="text-blue-800 underline hover:bg-sky-200 decoration-sky-500"
            >
              /go
            </a>{"   "}
            always takes you to the active server. Bookmark it.
          </p>
        </main>
        <hr class="max-w-screen-lg mx-auto py-8" />
        <aside class="max-w-screen-md mx-auto flex flex-col text-2xl pb-4">
          <h3>Also at:</h3>
          <ul>
            {otherUrls.map((url) => (
              <li>
                <a
                  class="text-blue-800 underline decoration-sky-500 hover:bg-sky-200 font-semibold"
                  href={url}
                  rel="noopener"
                  target="_blank"
                >
                  {url}
                </a>
              </li>
            ))}
            <li></li>
          </ul>
        </aside>
        <div class="flex-grow"></div>
        <footer class=" flex justify-center text-center ">
          <p>
            Powered by{" "}
            <a
              href="https://www.wikidata.org/wiki/Wikidata:Main_Page"
              class="text-blue-800 underline decoration-sky-500 hover:bg-sky-200 opacity-0.7"
            >
              Wikidata
            </a>.
          </p>
        </footer>
      </div>
    </>
  );
}
