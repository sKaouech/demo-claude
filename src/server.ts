import { createServer } from "node:http";
import { TaskStore } from "./tasks.ts";
import { completionRate } from "./stats.ts";

const store = new TaskStore();
const PORT = Number(process.env.PORT ?? 3000);

function readBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

const server = createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "GET" && req.url === "/tasks") {
    res.end(JSON.stringify(store.list()));
    return;
  }

  if (req.method === "POST" && req.url === "/tasks") {
    const body = JSON.parse(await readBody(req));
    try {
      const task = store.add(body.title, body.priority, body.dueDate);
      res.statusCode = 201;
      res.end(JSON.stringify(task));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: (error as Error).message }));
    }
    return;
  }

  if (req.method === "GET" && req.url === "/stats") {
    res.end(JSON.stringify({ completionRate: completionRate(store.list()) }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Route inconnue" }));
});

server.listen(PORT, () => console.log(`TaskFlow sur http://localhost:${PORT}`));
