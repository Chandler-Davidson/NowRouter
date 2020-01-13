import { NowRequest, NowResponse } from "@now/node";

export type RequestHandler = (
  request: NowRequest,
  response: NowResponse
) => [NowResponse, any];

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

  public handle(request: NowRequest, response: NowResponse): [NowResponse, any] {
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