import { BaseNode } from './BaseNode';
import { nodeConfig } from './nodeConfig';

const NODES = {
  InputNode: (props) => (
    <BaseNode {...props} config={nodeConfig.customInput} />
  ),
  OutputNode: (props) => (
    <BaseNode {...props} config={nodeConfig.customOutput} />
  ),
  LLMNode: (props) => (
    <BaseNode {...props} config={nodeConfig.llm} />
  ),
  TextNode: (props) => (
    <BaseNode {...props} config={nodeConfig.text} />
  ),
  Testing: (props) => (
    <BaseNode {...props} config={nodeConfig.testing} />
  ),
  SQLQueryNode: (props) => (
    <BaseNode {...props} config={nodeConfig.sqlQuery} />
  )
};

export default NODES;
