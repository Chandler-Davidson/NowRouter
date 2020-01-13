import { NowRequest, NowResponse } from "@now/node";
import { HttpMethod, RequestHandler } from "../types/index";

export default class NowRouter3 {
  private map = new Map<HttpMethod, RequestHandler>();

  public constructor(mappings: [HttpMethod, RequestHandler][]) {
    this.map = addRangeToMap(this.map, mappings);
  }

  public handle(request: NowRequest, response: NowResponse): NowResponse {
    const method = request.method as HttpMethod;
    const handler = this.map.get(method) as RequestHandler;
    return handler(request, response);
  }
}

function addRangeToMap<K, V>(map: Map<K, V>, arr: [K, V][]): Map<K, V> {
  for (const [key, value] of arr) {
    map.set(key, value);
  }

  return map;
}

// Tests
const router = new NowRouter3([
  ["GET", (req: any) => null as any],
  ["POST", (req: any) => null as any]
]);

export function test(req: NowRequest, res: NowResponse) {
  router.handle(req).send();
}
