import { setParams } from "@reservoir0x/reservoir-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

// Taken from the reservoir marketplace, this allows us to attach the api key without leaking it in the client:
// https://github.com/reservoirprotocol/marketplace-v2/blob/main/pages/api/reservoir/%5B...slug%5D.ts
// https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes
const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method, headers: reqHeaders } = req;
  const { slug } = query;
  // Isolate the query object
  delete query.slug;

  let endpoint: string = "";

  // convert the slug array into a path string: [a, b] -> 'a/b'
  if (typeof slug === "string") {
    endpoint = slug;
  } else {
    endpoint = (slug || [""]).join("/");
  }

  const url = new URL(`https://api.reservoir.tools/${endpoint}`);
  setParams(url, query);

  if (endpoint.includes("redirect/")) {
    res.redirect(url.href);
    return;
  }

  try {
    const options: RequestInit | undefined = {
      method,
    };

    const headers = new Headers();

    if (process.env.NEXT_RESERVOIR_API_KEY)
      headers.set("x-api-key", process.env.NEXT_RESERVOIR_API_KEY);

    if (typeof body === "object") {
      headers.set("Content-Type", "application/json");
      options.body = JSON.stringify(body);
    }

    if (
      reqHeaders["x-rkc-version"] &&
      typeof reqHeaders["x-rkc-version"] === "string"
    ) {
      headers.set("x-rkc-version", reqHeaders["x-rkc-version"]);
    }

    if (
      reqHeaders["x-rkui-version"] &&
      typeof reqHeaders["x-rkui-version"] === "string"
    ) {
      headers.set("x-rkui-version", reqHeaders["x-rkui-version"]);
    }

    options.headers = headers;

    const response = await fetch(url.href, options);

    let data: any;

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) throw data;

    if (contentType?.includes("image/")) {
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(Buffer.from(data));
    } else {
      if (endpoint.includes("/tokens/v5")) {
        //60s cache for tokens v5 api to prevent overloading
        res.setHeader(
          "Cache-Control",
          "maxage=0, s-maxage=60 stale-while-revalidate"
        );
      }
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export default proxy;
