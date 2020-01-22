import { NowRequest, NowResponse } from "@now/node";

export type RequestHandler = (
  request: NowRequest,
  response: NowResponse
) => [NowResponse, any] | Promise<[NowResponse, any]>;

type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export type RouterMethod = HttpMethod | "_";

export default class NowRouter {
  private map = new Map<RouterMethod, RequestHandler>();

  public constructor(mappings: [RouterMethod, RequestHandler][]) {
    const defaultHandlerAndMappings: [RouterMethod, RequestHandler][] = [["_", defaultHandler], ...mappings];
    this.map = addRangeToMap(this.map, defaultHandlerAndMappings);
  }

  public async handle(
    request: NowRequest,
    response: NowResponse
  ): Promise<[NowResponse, any]> {
    const method = request.method as HttpMethod;

    const handler = this.map.has(method)
      ? this.map.get(method) as RequestHandler
      : this.map.get("_") as RequestHandler;
    
    return handler(request, response);
  }
}

function defaultHandler(request: NowRequest, response: NowResponse): [NowResponse, string] {
  return [response.status(405), `The request method "${request.method}" is not supported.`];
}

function addRangeToMap<K, V>(map: Map<K, V>, arr: [K, V][]): Map<K, V> {
  for (const [key, value] of arr) {
    map.set(key, value);
  }

  return map;
}
