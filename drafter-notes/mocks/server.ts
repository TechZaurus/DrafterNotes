import { setupServer } from "msw/node";
import {http} from "msw";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

