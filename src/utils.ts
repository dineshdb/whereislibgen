// copied from https://github.com/rvnproject/whereislibgen

export async function fetchUrls() {
  const libgenId = "Q22017206";
  const officialWebsiteProperty = "P856";
  const sparql = `
	  SELECT ?urls WHERE {
		{ wd:${libgenId} p:${officialWebsiteProperty} [wikibase:rank wikibase:NormalRank; ps:${officialWebsiteProperty} ?urls]. }
	  }
	  `;
  const response = await fetch(
    `https://query.wikidata.org/sparql?format=json&query=${
      encodeURIComponent(sparql)
    }`,
  );
  const data = await response.json();
  const urls = data.results.bindings.map((result) => result.urls.value);
  return urls.sort(compareUrls);
}

export function compareUrls(url1: string, url2: string) {
  // URL beginning with `https://`, and ending in a non-digit character (of the TLD) and a potential trailing slash
  const httpsDomainRE = /^https:\/\/(.*)\D\/?$/;
  // URL beginning with `http://`, and ending in a non-digit character (of the TLD) and a potential trailing slash
  const httpDomainRE = /^http:\/\/(.*)\D\/?$/;

  // Regular URL's pointing to an HTTPS address come first
  if (httpsDomainRE.test(url1)) {
    return -1;
  } else if (httpsDomainRE.test(url2)) {
    return 1;
    // IP addresses using HTTPS come second
  } else if (url1.substr(0, 5) === "https") {
    return -1;
  } else if (url2.substr(0, 5) === "https") {
    return 1;
    // Only then come regular domains hosted through naked HTTP
  } else if (httpDomainRE.test(url1)) {
    return -1;
  } else if (httpDomainRE.test(url2)) {
    return 1;
  }
  // And if both are an IP address through naked HTTP, we don't care which comes first:
  return 0;
}
