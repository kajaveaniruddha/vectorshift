// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfig } from './nodes/nodeConfig';

export const PipelineToolbar = () => {
    return (
        <div className="p-4 bg-slate-100">
            <div className="mt-4 flex flex-wrap gap-4">
                {Object.keys(nodeConfig).map((type) => (
                    <DraggableNode 
                        key={type}
                        type={type}
                        label={nodeConfig[type].title}
                    />
                ))}
            </div>
        </div>
    );
};
