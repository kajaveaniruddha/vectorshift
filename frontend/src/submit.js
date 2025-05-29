// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({ nodes: state.nodes, edges: state.edges }));

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/pipelines/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await response.json();
            alert(`Pipeline Parsed:\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            alert("Error parsing pipeline: " + error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-bold shadow-lg transition-colors duration-200"
            >
                Submit Pipeline
            </button>
        </div>
    );
}
