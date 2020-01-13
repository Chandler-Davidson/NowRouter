import NowRouter from "../lib/index";
import { HttpMethod, RequestHandler } from "../types";
import { NowRequest, NowResponse } from "@now/node";

const routeMappings: [HttpMethod, RequestHandler][] = [["GET", HandleGet]];

test("Handle performs execution", () => {
  expect();
});

function HandleGet(request: NowRequest): NowResponse {
  return "";
}
