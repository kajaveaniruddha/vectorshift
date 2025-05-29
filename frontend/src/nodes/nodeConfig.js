export const nodeConfig = {
  //node name
  customInput: {
    title: "Input",
    fields: [
      {
        type: "input",
        name: "inputName",
        label: "Name",
        default: "input_",
      },
      {
        type: "select",
        name: "inputType",
        label: "Type",
        default: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ],
      },
    ],
    outputs: [{ id: "value" }],
  },

  customOutput: {
    title: "Output",
    fields: [
      {
        type: "input",
        name: "outputName",
        label: "Name",
        default: "output_",
      },
      {
        type: "select",
        name: "outputType",
        label: "Type",
        default: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "Image" },
        ],
      },
    ],
    inputs: [{ id: "value" }],
  },

  llm: {
    title: "LLM",
    content: "This is a LLM.",
    inputs: [{ id: "system" }, { id: "prompt" }],
    outputs: [{ id: "response" }],
  },

  text: {
    title: "Text",
    description: "Define text with variables using {{variableName}}",
    fields: [
      {
        type: "input",
        name: "text",
        label: "Text",
        default: "",
        placeholder: "Enter text with {{variables}}",
      },
    ],
    outputs: [{ id: "output" }],
    style: {
      width: "auto",
      minWidth: "240px",
      maxWidth: "480px",
    },
  },

  testing: {
    title: "Testing Node",
    content: "This is a testing node",
    fields: [
      {
        type: "input",
        name: "testInput",
        label: "Test Input",
        default: "test value",
      },
      {
        type: "select",
        name: "testType",
        label: "Test Type",
        default: "Type1",
        options: [
          { value: "Type1", label: "Type 1" },
          { value: "Type2", label: "Type 2" },
        ],
      },
    ],
    inputs: [{ id: "testIn" }],
    outputs: [{ id: "testOut" }],
  },

  sqlQuery: {
    title: "SQL Query",
    description: "Execute SQL queries with parameters",
    category: "database",
    fields: [
      {
        type: "select",
        name: "connectionType",
        label: "Connection Type",
        default: "postgres",
        options: [
          { value: "postgres", label: "PostgreSQL" },
          { value: "mysql", label: "MySQL" },
          { value: "sqlite", label: "SQLite" },
        ],
        required: true,
      },
      {
        type: "textarea",
        name: "query",
        label: "SQL Query",
        default: "SELECT * FROM {{table}} WHERE {{condition}}",
        placeholder: "Enter your SQL query with {{parameters}}",
        required: true,
      },
      {
        type: "number",
        name: "timeout",
        label: "Timeout (ms)",
        default: 5000,
        min: 1000,
        max: 30000,
      },
      {
        type: "select",
        name: "resultType",
        label: "Result Type",
        default: "json",
        options: [
          { value: "json", label: "JSON" },
          { value: "csv", label: "CSV" },
          { value: "table", label: "Table" },
        ],
      },
      {
        type: "input",
        name: "maxRows",
        label: "Max Rows",
        default: "1000",
      }
    ],
    inputs: [
      { id: "connection", label: "DB Connection" },
      { id: "parameters", label: "Query Parameters" },
      { id: "variables", label: "Variables" },
    ],
    outputs: [
      { id: "result", label: "Query Result" },
      { id: "error", label: "Error" },
      { id: "metadata", label: "Query Metadata" }
    ],
    style: {
      width: 320,
      backgroundColor: '#ffffff'
    }
  }
};