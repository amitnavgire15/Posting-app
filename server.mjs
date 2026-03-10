#!/usr/bin/env node
// server.mjs — Node MCP server over STDIO using McpServer + registerTool

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1) Create the server (name/version are arbitrary)
const server = new McpServer({
  name: "mcp-time",
  version: "1.0.0",
  // You can declare capabilities explicitly if you like; tools will be discovered automatically
  capabilities: { tools: {}, resources: {} },
});

// 2) Register a simple tool: time.now
server.registerTool(
  "time.now",
  {
    description: "Return the current time in ISO format",
    // Zod (or plain JSON Schema) is supported for input validation
    inputSchema: {
      tz: z.string().optional().describe("IANA time zone, e.g. 'Asia/Kolkata'"),
    },
  },
  async ({ tz }) => {
    try {
      const now = tz
        ? new Date(new Date().toLocaleString("en-US", { timeZone: tz }))
        : new Date();

      return {
        content: [{ type: "text", text: now.toISOString() }],
      };
    } catch {
      return {
        isError: true,
        content: [{ type: "text", text: `Invalid time zone: ${tz || ""}` }],
      };
    }
  }
);

// 3) Bind to STDIO so an MCP client can spawn this process
await server.connect(new StdioServerTransport());
