import { NowRequest, NowResponse } from "@now/node";

export type RequestHandler = (
  request: NowRequest,
  response: NowResponse
) => [NowResponse, any] | Promise<[NowResponse, any]>;

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export default class NowRouter {
  private map = new Map<HttpMethod, RequestHandler>();

  public constructor(mappings: [HttpMethod, RequestHandler][]) {
    this.map = addRangeToMap(this.map, mappings);
  }

  public async handle(
    request: NowRequest,
    response: NowResponse
  ): Promise<[NowResponse, any]> {
    const method = request.method as HttpMethod;
    const handler = this.map.get(method) as RequestHandler;
    return await handler(request, response);
  }
}

function addRangeToMap<K, V>(map: Map<K, V>, arr: [K, V][]): Map<K, V> {
  for (const [key, value] of arr) {
    map.set(key, value);
  }

  return map;
}
