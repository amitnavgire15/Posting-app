
#!/usr/bin/env node
// server.js — Minimal Node MCP server over STDIO

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server with a name and version
const server = new Server(
  {
    name: "mcp-time",
    version: "1.0.0",
  },
  {
    capabilities: {
      // Expose tools; you can also add resources, prompts, etc.
      tools: {},
    },
  }
);

// Define a simple tool: time.now
server.tool(
  "time.now",
  {
    description: "Return the current time in ISO format",
    inputSchema: z.object({
      tz: z.string().optional().describe("IANA time zone, e.g. 'Asia/Kolkata'"),
    }),
  },
  async ({ tz }) => {
    try {
      const now = tz
        ? new Date(new Date().toLocaleString("en-US", { timeZone: tz }))
        : new Date();
      return {
        content: [
          {
            type: "text",
            text: now.toISOString(),
          },
        ],
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: "text", text: `Invalid time zone: ${tz || ""}` }],
      };
    }
  }
);

// Start the server on STDIO (so MCP clients can spawn it)
const transport = new StdioServerTransport();
server.connect(transport);

