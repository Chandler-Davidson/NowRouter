import { NowRequest, NowResponse } from "@now/node";
export declare type RequestHandler = (request: NowRequest, response: NowResponse) => [NowResponse, any];
export declare type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
export default class NowRouter {
    private map;
    constructor(mappings: [HttpMethod, RequestHandler][]);
    handle(request: NowRequest, response: NowResponse): [NowResponse, any];
}
