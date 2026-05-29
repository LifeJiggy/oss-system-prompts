# Tool Calling and MCP Integration

## Tool Calling

Tool calling enables AI models to invoke external tools or functions to complete tasks. This is essential for connecting AI systems with external services, APIs, and custom functionality.

### Configuration

To configure tool calling with an NIM deployment:

```bash
export ANTHROPIC_BASE_URL="http://${NIM_ENDPOINT}:${NIM_SERVER_PORT}"
export ANTHROPIC_API_KEY="not-used"
export ANTHROPIC_CUSTOM_MODEL_OPTION="${MODEL_NAME}"
```

- `${NIM_ENDPOINT}` - The hostname or IP address of your NIM deployment
- `${NIM_SERVER_PORT}` - The port (default: 8000)

### Model Configuration

NIM does not validate `ANTHROPIC_API_KEY`. Set it to any non-empty string.

`ANTHROPIC_CUSTOM_MODEL_OPTION` adds the model to the Claude Code /model picker.

### Alias Mapping

To map Claude Code built-in aliases to NIM:

```bash
export ANTHROPIC_API_KEY="not-used"
export ANTHROPIC_BASE_URL="http://${NIM_ENDPOINT}:${NIM_SERVER_PORT}"
export ANTHROPIC_CUSTOM_MODEL_OPTION="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${MODEL_NAME}"
export CLAUDE_CODE_SUBAGENT_MODEL="${MODEL_NAME}"
```

## MCP Integration

Model Context Protocol (MCP) enables seamless integration between AI models and external tools.

### Examples

To find the active model name and export it as `MODEL_NAME`:

```bash
# List available models
ollama list

# Example output:
# NAME                ID              SIZE      MODIFIED
# qwen2.5-coder:7b    dae161e27b0e    4.7 GB    2 weeks ago

export MODEL_NAME="qwen2.5-coder:7b"
```

### Troubleshooting

**Claude Code Returns Model 404 Error**

Symptoms: Claude Code connects, but NIM logs show errors like:
```
The model 'claude-haiku-4-5-20251001' does not exist
```

Cause: Claude Code uses built-in aliases that resolve to Anthropic model IDs, which NIM doesn't serve.

Resolution: Map the aliases explicitly:

```bash
export ANTHROPIC_API_KEY="not-used"
export ANTHROPIC_BASE_URL="http://${NIM_ENDPOINT}:${NIM_SERVER_PORT}"
export ANTHROPIC_CUSTOM_MODEL_OPTION="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${MODEL_NAME}"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${MODEL_NAME}"
export CLAUDE_CODE_SUBAGENT_MODEL="${MODEL_NAME}"
```

## Additional Options

For additional configuration options such as `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` and `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION`, refer to the Claude Code model configuration documentation.