// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} min-w-[90px] h-[70px] flex items-center justify-center flex-col 
        rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 
        hover:from-violet-400 hover:to-purple-500 
        transition-all duration-200 cursor-grab active:cursor-grabbing 
        shadow-lg hover:shadow-xl hover:scale-105 
        border border-violet-300/20 backdrop-blur-sm
        group relative overflow-hidden`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {/* Subtle shine effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-6 h-6 mb-1 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/60" />
        </div>
        <span className="text-white font-medium text-sm text-center px-2 leading-tight">
          {label}
        </span>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-300 to-purple-300" />
    </div>
  );
};
