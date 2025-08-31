---
title: MCP
date: "2025-08-30T15:13:00.000Z"
---
It is time to re-implement dinnercaster, yet again. This time we will expose a dinnercaster api as a MCP server to connect to claude.ai desktop/web. The MCP inspector tool can connect, but connecting from claude.ai is still not solved.

Where we landed: [https://github.com/redfive410/dinnercaster3/pull/1/files](https://github.com/redfive410/dinnercaster3/pull/1/files)

Helpful tool: [https://github.com/modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector)

```
 I've successfully updated your repository to expose a route for Model Context Protocol. Here's what I've implemented:

  Dependencies Added:
  - mcp==1.0.0 - Core MCP library
  - pydantic==2.5.0 - For data validation (required by MCP)

  MCP Server Features:
  - Route: /mcp - Main MCP server endpoint
  - Info Route: /mcp-info - Provides information about available MCP tools
  - Two Sample Tools:
    - echo - Echoes back input text
    - get_info - Returns information about the service

  Testing the MCP Server:
  1. Start the server: uvicorn main:app --reload
  2. Visit http://localhost:8000/mcp-info to see available tools
  3. The MCP server is mounted at http://localhost:8000/mcp

  The implementation provides a foundation for MCP server functionality that can be extended with additional tools as needed.
```
