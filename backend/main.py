from fastapi import FastAPI, Request, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    # Build adjacency list: key: source, value: list of targets
    adj = {}
    for node in nodes:
        node_id = node.get("id")
        adj[node_id] = []
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in adj:
            adj[source].append(target)
    visited = set()
    rec_stack = set()

    def dfs(v):
        visited.add(v)
        rec_stack.add(v)
        for neighbour in adj.get(v, []):
            if neighbour not in visited:
                if dfs(neighbour):
                    return True
            elif neighbour in rec_stack:
                return True
        rec_stack.remove(v)
        return False

    for node in adj:
        if node not in visited:
            if dfs(node):
                return False
    return True

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag = is_dag(nodes, edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}
