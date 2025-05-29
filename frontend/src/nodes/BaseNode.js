import { useState, useEffect, useRef } from "react"; // Import useRef
import { Handle, Position } from "reactflow";

export const BaseNode = ({ id, data, config }) => {
  const [nodeData, setNodeData] = useState(data || {});
  const textareaRef = useRef(null); // Ref for the textarea

  const adjustTextareaHeight = (textarea) => {
    if (!textarea) return;

    // Reset height to measure scrollHeight accurately
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChange = (field, value) => {
    setNodeData((prev) => ({ ...prev, [field]: value }));
    if (field === "text" && textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  };

  // Adjust textarea height on mount and when the text changes
  useEffect(() => {
    if (config.title === "Text" && textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [config.title]);

  const renderFields = () => {
    return config.fields?.map((field, index) => {
      if (field.type === "input" && field.name === "text") {
        return (
          <div key={index} className="flex flex-col gap-2 w-full">
            <label className="text-xs text-violet-700 font-semibold">
              {field.label}:
            </label>
            <textarea
              ref={textareaRef}
              value={nodeData[field.name] || field.default || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={1}
              className="w-full px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
                bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
                focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
                placeholder-violet-300 resize-none no-scrollbar whitespace-pre-wrap"
              style={{ 
                minHeight: '2rem',
                width: '300px'  
              }}
            />
          </div>
        );
      }
      if (field.type === "select") {
        return (
          <div key={index} className="flex items-center gap-3 w-full">
            <label className="text-xs text-violet-700 font-semibold whitespace-nowrap min-w-fit">
              {field.label}:
            </label>
            <select
              value={nodeData[field.name] || field.default}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="flex-1 px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
                bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
                focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
                cursor-pointer"
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      }
      if (field.type === "textarea") {
        return (
          <div key={index} className="flex flex-col gap-2 w-full">
            <label className="text-xs text-violet-700 font-semibold">
              {field.label}:
            </label>
            <textarea
              value={nodeData[field.name] || field.default || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 text-sm border-2 border-violet-200 rounded-lg 
                bg-white hover:border-violet-300 focus:outline-none focus:ring-2 
                focus:ring-violet-400/50 focus:border-violet-400 transition-all duration-200
                min-h-[90px] resize-none placeholder-violet-300"
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div
      className="border-2 border-violet-200 rounded-xl shadow-lg flex flex-col p-4 
        hover:shadow-xl hover:border-violet-300 transition-all duration-200
        bg-gradient-to-br from-white to-violet-50/30 backdrop-blur-sm
        relative overflow-hidden group"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-500" />
          <div className="text-base font-bold text-violet-800">
            {config.title}
          </div>
        </div>
        {config.category && (
          <span
            className="text-xs px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 
            text-violet-700 rounded-full font-medium border border-violet-200"
          >
            {config.category}
          </span>
        )}
      </div>

      {/* Description */}
      {(config.content || config.description) && (
        <div className="text-sm text-violet-600 mb-4 relative z-10 leading-relaxed">
          {config.content || config.description}
        </div>
      )}

      {/* Fields */}
      <div className="space-y-4 relative z-10">{renderFields()}</div>

      {/* Input handles */}
      {config.inputs?.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-500 border-2 border-white 
            shadow-lg hover:scale-110 transition-transform duration-200"
          style={{
            top: `${((index + 1) * 100) / (config.inputs.length + 1)}%`,
          }}
        />
      ))}

      {/* Output handles */}
      {config.outputs?.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-500 border-2 border-white 
            shadow-lg hover:scale-110 transition-transform duration-200"
          style={{
            top: `${((index + 1) * 100) / (config.outputs.length + 1)}%`,
          }}
        />
      ))}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400" />
    </div>
  );
};
