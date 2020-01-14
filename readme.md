## Now-Router

A router built for [Zeit Now's](https://zeit.co/) [Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction/).

### Problem

Zeit Now provides an excellent interface for serverless functions. Out of the box, they use path based routing, but lack a method of routing your requests based on Http method. This library's goal is to bridge that gap.

### Install

```
npm i now-router
```

### How to use

Requests to `myDomain/api/coffeeShops` are routed to `api/coffeeShops.ts` where the default exported function handles the incoming request. Within said function, use Now Router to map a Http method to a function.

_coffeeShops.ts_
```typescript
import { NowRequest, NowResponse } from "@now/node";
import Router from "now-router";

const mappings: [HttpMethod, RequestHandler][] = [
  ["GET", fetchCoffeeShop],
  ["POST", createCoffeeShop]
];

const router = new Router(mappings);

export default function(req: NowRequest, res: NowResponse) {
  const [response, body] = await router.handle(req, res);
  return response.send(body);
}

async function fetchCoffeeShop(
  req: NowRequest,
  res: NowResponse
): Promise<[NowResponse, any]> {
  const { id } = req.body;
  const shop = await coffeeShopRepository.get(id);

  if (shop) return [res, shop];

  return [res.status(500), "Failed to get coffee shop"];
}

async function createCoffeeShop(
  req: NowRequest,
  res: NowResponse
): Promise<[NowResponse, any]> {
  const newShop = req.body;
  const result = await coffeeShopRepository.addShop(newShop);

  return [res.status(result.error ? 500 : 200), ""];
}
```