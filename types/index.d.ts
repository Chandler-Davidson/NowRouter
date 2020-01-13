import { NowRequest, NowResponse } from "@now/node";

export type RequestHandler = (
  request: NowRequest,
  response: NowResponse
) => NowResponse;

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
