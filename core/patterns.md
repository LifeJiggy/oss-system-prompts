# Code Patterns — Exactly How to Write It (Any OSS Project — Multi-Language)

## Overview

This document shows exact patterns to follow for any open-source Python project / multi-language repository. Copy these patterns exactly. Do not deviate. When in doubt, copy exactly from existing code in the codebase.

This covers Python, tool/module registration, plugin development, async code, testing, and project-specific patterns applicable across languages.

---

## Table of Contents

1. [Python Code Patterns](#python-code-patterns)
2. [TypeScript Code Patterns](#typescript-code-patterns)
3. [Rust Code Patterns](#rust-code-patterns)
4. [Go Code Patterns](#go-code-patterns)
5. [Tool/Module Registration Patterns](#toolmodule-registration-patterns)
6. [Plugin Development Patterns](#plugin-development-patterns)
7. [Async Code Patterns](#async-code-patterns)
8. [Test Patterns](#test-patterns)
9. [Error Handling Patterns](#error-handling-patterns)
10. [Configuration Patterns](#configuration-patterns)
11. [Resource Management Patterns](#resource-management-patterns)
12. [Naming Conventions](#naming-conventions)
13. [Import Patterns](#import-patterns)
14. [File Structure](#file-structure)
15. [Security Patterns](#security-patterns)

---

## Python Code Patterns

### Function Definitions

```python
# CORRECT — Full typing
def process_user_data(user_id: str, options: ProcessOptions) -> Dict[str, Any]:
    return {
        "id": user_id,
        "name": "Example",
        "email": "example@example.com"
    }

# WRONG — No types
def process_user_data(user_id, options):
    return {"id": user_id}
```

### Async Functions

```python
# CORRECT — Async with types
async def fetch_user(user_id: str) -> Optional[User]:
    try:
        response = await http_client.get(f"/api/users/{user_id}")
        if response.status_code == 404:
            return None
        return User(**response.json())
    except HTTPError as e:
        logger.error(f"Fetch failed: {e}")
        return None

# WRONG — No types, no error handling
async def fetch_user(user_id):
    return await http_client.get("/api/users/" + user_id)
```

### Type Hints

```python
from typing import Any, Dict, List, Optional, Union

# CORRECT — Explicit types
def get_user(user_id: str) -> Optional[User]:
    ...

def list_users(active_only: bool = False) -> List[User]:
    ...

def save_config(config: Dict[str, Any]) -> bool:
    ...

# CORRECT — Union types
Result = Union[SuccessResult, ErrorResult]

# CORRECT — Type aliases
UserId = str
UserList = List[User]
AsyncResult = Awaitable[Result]

# WRONG — Missing types
def get_user(user_id):
    ...

def list_users(active_only=False):
    ...
```

### Classes and Dataclasses

```python
from dataclasses import dataclass, field
from typing import Dict, Optional

# CORRECT — Dataclass with proper defaults
@dataclass
class PluginManifest:
    name: str
    version: str
    description: str = ""
    author: str = ""
    sandbox: bool = False
    depends_on: Dict[str, str] = field(default_factory=dict)

# WRONG — Mutable default (shared across instances)
@dataclass
class PluginManifest:
    name: str
    depends_on: Dict[str, str] = {}  # BUG: shared mutable default
```

### Properties

```python
# CORRECT — No side effects on read
class PluginState:
    @property
    def state_dir(self) -> Path:
        return project_root / "plugins" / self.manifest.name

    def save_state(self, key: str, data: Any) -> None:
        self.state_dir.mkdir(parents=True, exist_ok=True)  # Create on write
        ...

# WRONG — Side effect on property access
class PluginState:
    @property
    def state_dir(self) -> Path:
        path = project_root / "plugins" / self.manifest.name
        path.mkdir(parents=True, exist_ok=True)  # BUG: creates dir on every read
        return path
```

### Error Classification (Infrastructure vs Tools)

```python
# Module-level handlers: Return JSON error strings
def my_module_handler(param: str) -> str:
    if not param:
        return json.dumps({"success": False, "error": "Missing param"})
    return json.dumps({"success": True, "data": process(param)})

# Infrastructure: Raise proper exceptions
def validate_input(param: str) -> None:
    if not param:
        raise ValueError("Parameter cannot be empty")
    if len(param) > 100:
        raise ValueError("Parameter too long")
```

---

## TypeScript Code Patterns

### Type Definitions

```typescript
// CORRECT — Explicit interfaces and types
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type AsyncResult<T> = Promise<T>;
type UserList = User[];

// WRONG — Implicit any
function getUser(id) {
  return fetch(`/api/users/${id}`);
}
```

### Async/Await

```typescript
// CORRECT — Typed async with error handling
async function fetchUser(userId: string): Promise<User | null> {
  try {
    const response = await httpClient.get(`/api/users/${userId}`);
    if (response.status === 404) return null;
    return response.data as User;
  } catch (error) {
    if (error instanceof HTTPError) {
      logger.error(`Fetch failed: ${error.message}`);
    }
    return null;
  }
}

// WRONG — Unhandled promise
function fetchUser(userId: string) {
  return httpClient.get(`/api/users/${userId}`).then(r => r.data);
}
```

### Functional Components (React)

```typescript
// CORRECT — Typed component with hooks
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [userId]);

  if (loading) return <Spinner />;
  if (!user) return <NotFound />;
  return <ProfileView user={user} onUpdate={onUpdate} />;
}

// WRONG — No cleanup on unmount
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser); // State update after unmount
  }, [userId]);
  return <div>{user?.name}</div>;
}
```

### Generics

```typescript
// CORRECT — Generic wrapper
class Result<T> {
  constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: string
  ) {}
}

function wrap<T>(fn: () => T): Result<T> {
  try {
    return new Result(true, fn());
  } catch (e) {
    return new Result<T>(false, undefined, String(e));
  }
}

// WRONG — Losing type information
function wrap(fn: () => any): any {
  try {
    return { success: true, data: fn() };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
```

---

## Rust Code Patterns

### Struct and Implementation

```rust
// CORRECT — Derive traits, typed fields
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
}

impl User {
    pub fn new(id: String, name: String, email: String) -> Self {
        Self {
            id,
            name,
            email,
            created_at: Utc::now(),
        }
    }
}

// WRONG — Missing derives, unnecessary clones
pub struct User {
    pub id: String,
    pub name: String,
}
```

### Error Handling

```rust
use anyhow::{Context, Result};
use thiserror::Error;

// CORRECT — Typed errors with thiserror
#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Not found: {0}")]
    NotFound(String),
    #[error("Validation error: {0}")]
    Validation(String),
    #[error("Network error: {0}")]
    Network(#[from] reqwest::Error),
}

pub async fn fetch_user(user_id: &str) -> Result<User, ApiError> {
    let response = reqwest::get(format!("/api/users/{user_id}"))
        .await
        .map_err(ApiError::Network)?;

    if response.status() == StatusCode::NOT_FOUND {
        return Err(ApiError::NotFound(user_id.to_string()));
    }

    let user = response
        .json::<User>()
        .await
        .context("Failed to parse user response")?;

    Ok(user)
}

// WRONG — String errors, unwrap
pub async fn fetch_user(user_id: &str) -> Result<User> {
    let response = reqwest::get(format!("/api/users/{user_id}")).await.unwrap();
    Ok(response.json().await.unwrap())
}
```

### Builder Pattern

```rust
// CORRECT — Builder with consuming chain
#[derive(Debug, Default)]
pub struct ConfigBuilder {
    api_url: Option<String>,
    timeout: Option<Duration>,
    retries: Option<u32>,
}

impl ConfigBuilder {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn api_url(mut self, url: impl Into<String>) -> Self {
        self.api_url = Some(url.into());
        self
    }

    pub fn timeout(mut self, timeout: Duration) -> Self {
        self.timeout = Some(timeout);
        self
    }

    pub fn retries(mut self, retries: u32) -> Self {
        self.retries = Some(retries);
        self
    }

    pub fn build(self) -> Result<Config, String> {
        Ok(Config {
            api_url: self.api_url.ok_or("api_url is required")?,
            timeout: self.timeout.unwrap_or(Duration::from_secs(30)),
            retries: self.retries.unwrap_or(3),
        })
    }
}

// WRONG — Mutating builder with &mut self
pub fn api_url(&mut self, url: &str) { ... }
```

### Async in Rust

```rust
// CORRECT — Tokio async with typed error
pub async fn process_users(ids: &[String]) -> Result<Vec<User>, ApiError> {
    let handles: Vec<_> = ids
        .iter()
        .map(|id| fetch_user(id))
        .collect();

    let results: Vec<Result<User, ApiError>> =
        futures::future::join_all(handles).await;

    let users: Vec<User> = results
        .into_iter()
        .filter_map(|r| r.ok())
        .collect();

    Ok(users)
}

// WRONG — Blocking in async context
pub async fn process_users(ids: &[String]) -> Result<Vec<User>, ApiError> {
    let mut users = vec![];
    for id in ids {
        users.push(fetch_user(id).await?); // Sequential — no parallelism
    }
    Ok(users)
}
```

---

## Go Code Patterns

### Struct and Interface

```go
// CORRECT — Explicit interfaces, exported types
package user

type User struct {
    ID        string    `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

type Repository interface {
    FindByID(ctx context.Context, id string) (*User, error)
    List(ctx context.Context, filter Filter) ([]User, error)
    Save(ctx context.Context, user *User) error
}

type Service struct {
    repo Repository
}

func NewService(repo Repository) *Service {
    return &Service{repo: repo}
}

// WRONG — Concrete types, no interfaces
type UserService struct {
    db *sql.DB
}
```

### Error Handling

```go
// CORRECT — Wrapped errors with sentinel values
var ErrNotFound = errors.New("user not found")
var ErrInvalidInput = errors.New("invalid input")

func (s *Service) GetUser(ctx context.Context, id string) (*User, error) {
    user, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("get user %s: %w", id, err)
    }
    if user == nil {
        return nil, fmt.Errorf("get user %s: %w", id, ErrNotFound)
    }
    return user, nil
}

// WRONG — Bare errors, no wrapping
func (s *Service) GetUser(ctx context.Context, id string) (*User, error) {
    return s.repo.FindByID(ctx, id)
}
```

### Concurrency

```go
// CORRECT — errgroup for fan-out
import "golang.org/x/sync/errgroup"

func (s *Service) ProcessUsers(ctx context.Context, ids []string) ([]Result, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([]Result, len(ids))

    for i, id := range ids {
        i, id := i, id // capture loop variables
        g.Go(func() error {
            user, err := s.GetUser(ctx, id)
            if err != nil {
                return err
            }
            results[i] = Result{User: user}
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}

// WRONG — Uncontrolled goroutines, no sync
for _, id := range ids {
    go func(id string) {
        user, _ := s.GetUser(context.Background(), id)
        results = append(results, user) // Data race
    }(id)
}
```

### Middleware Pattern

```go
// CORRECT — Functional middleware
type Middleware func(http.Handler) http.Handler

func Chain(h http.Handler, middlewares ...Middleware) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
    })
}

// WRONG — Mutating state, no composability
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Request: %s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
```

---

## Tool/Module Registration Patterns

### Basic Module Registration

```python
# modules/my_module.py
import json
from typing import Any, Dict, Optional

from modules.registry import registry

def my_module_handler(param1: str, param2: Optional[int] = None, task_id: Optional[str] = None) -> str:
    """Brief description of what this module does.

    Args:
        param1: Description of param1
        param2: Description of param2
        task_id: Task tracking identifier

    Returns:
        JSON string with result
    """
    try:
        # Implementation
        result = {"success": True, "data": {"key": "value"}}
        return json.dumps(result)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

def check_requirements() -> bool:
    """Check if required environment is available."""
    return True  # or os.getenv("SOME_KEY") is not None

# Use the project's registration API
registry.register(
    name="my_module",
    category="file",  # Choose appropriate category
    schema={
        "name": "my_module",
        "description": "What the module does — concise, under 60 chars",
        "parameters": {
            "type": "object",
            "properties": {
                "param1": {
                    "type": "string",
                    "description": "Description of param1"
                },
                "param2": {
                    "type": "integer",
                    "description": "Description of param2"
                }
            },
            "required": ["param1"]
        }
    },
    handler=lambda args, **kw: my_module_handler(
        param1=args.get("param1", ""),
        param2=args.get("param2"),
        task_id=kw.get("task_id"),
    ),
    check_fn=check_requirements,
)
```

### Module with Requirements Check

```python
def check_requirements() -> bool:
    """Check if required env vars are set."""
    api_key = os.getenv("EXAMPLE_API_KEY")
    if not api_key:
        return False
    return True

# Use the project's registration API with requires_env
registry.register(
    name="example_module",
    category="example",
    schema={...},
    handler=lambda args, **kw: example_handler(param=args.get("param", ""), task_id=kw.get("task_id")),
    check_fn=check_requirements,
    requires_env=["EXAMPLE_API_KEY"],
)
```

### Register in the Central Registry

After creating the module file, register it in the central tool/module registry:

```python
# In core_registry.py — add to _CORE_MODULES list
_CORE_MODULES = [
    # ... existing modules ...
    "my_module",  # Must match registry.register(name=...) exactly
]
```

### Module with JSON Response

```python
# ALL module handlers MUST return JSON strings
def my_module(param: str, task_id: Optional[str] = None) -> str:
    """Module handler returning JSON string.

    Returns:
        JSON string with success/error structure
    """
    try:
        data = process(param)
        return json.dumps({"success": True, "data": data})
    except ValidationError as e:
        return json.dumps({"success": False, "error": f"Invalid input: {e}"})
    except Exception as e:
        logger.exception("Unexpected error in my_module")
        return json.dumps({"success": False, "error": f"Internal error: {e}"})
```

---

## Plugin Development Patterns

### Plugin Structure

```
~/.config/my-project/plugins/my-plugin/
├── plugin.yaml
├── __init__.py
└── ...
```

### plugin.yaml

```yaml
name: my-plugin
version: "1.0.0"
description: What this plugin does
author: Your Name
sandbox: false
```

### __init__.py

```python
from the_project.plugin_system import PluginContext

def register(ctx: PluginContext) -> None:
    """Register plugin lifecycle hooks and tools."""

    @ctx.register_hook("pre_tool_call")
    def pre_tool_call(tool_name: str, args: dict) -> dict:
        """Modify or validate tool arguments before execution."""
        return args

    @ctx.register_hook("post_tool_call")
    def post_tool_call(tool_name: str, result: str) -> str:
        """Modify or log tool results after execution."""
        return result

    @ctx.register_tool(
        name="plugin_tool",
        description="Tool provided by this plugin",
        parameters={
            "type": "object",
            "properties": {
                "input": {"type": "string", "description": "Input value"}
            },
            "required": ["input"]
        }
    )
    def plugin_tool_handler(input: str) -> str:
        """Handle plugin tool call."""
        return json.dumps({"success": True, "data": f"Processed: {input}"})
```

### Plugin Lifecycle Hooks

Available hooks:
- `pre_tool_call` — Before each tool execution
- `post_tool_call` — After each tool execution
- `pre_llm_call` — Before each LLM call
- `post_llm_call` — After each LLM call
- `on_session_start` — Session initialization
- `on_session_end` — Session teardown

---

## Async Code Patterns

### Async in Module Handlers

Module/tool handlers are synchronous. For async operations, use the async bridge:

```python
import asyncio
from typing import Optional

def async_module_handler(task_id: Optional[str] = None) -> str:
    """Handler that needs async — use run_async."""
    try:
        result = asyncio.run(_async_operation())
        return json.dumps({"success": True, "data": result})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

async def _async_operation() -> Dict[str, Any]:
    """Internal async implementation."""
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/data")
        response.raise_for_status()
        return response.json()
```

### Gateway Async Patterns

```python
# CORRECT — asyncio.gather with return_exceptions
results = await asyncio.gather(*tasks, return_exceptions=True)
for result in results:
    if isinstance(result, Exception):
        logger.error(f"Task failed: {result}")

# WRONG — Without return_exceptions, one failure crashes all
results = await asyncio.gather(*tasks)  # One failure = all fail
```

### Context Managers

```python
# CORRECT — Async context manager
async def process_data():
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()

# CORRECT — Sync context manager with cleanup
def read_file(path: Path) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()
```

---

## Test Patterns

### Pytest Structure

```python
# tests/modules/test_my_module.py
import json
import pytest
from unittest.mock import patch, MagicMock

from modules.my_module import my_module_handler

class TestMyModule:
    def setup_method(self):
        """Setup before each test."""
        self.valid_input = {"param1": "test_value"}

    def test_success_path(self):
        """Should return success with valid input."""
        result = json.loads(my_module_handler(**self.valid_input))
        assert result["success"] is True
        assert "data" in result
        assert result["data"]["key"] == "expected_value"

    def test_missing_required_param(self):
        """Should return error when required param is missing."""
        result = json.loads(my_module_handler(param1=""))
        assert result["success"] is False
        assert "error" in result

    def test_edge_case_empty_input(self):
        """Should handle empty input gracefully."""
        result = json.loads(my_module_handler(param1=""))
        assert result["success"] is False

    @patch("modules.my_module.external_api_call")
    def test_external_dependency(self, mock_api):
        """Should mock external API calls."""
        mock_api.return_value = {"status": "ok"}
        result = json.loads(my_module_handler(**self.valid_input))
        assert result["success"] is True
        mock_api.assert_called_once()
```

### Mocking External Dependencies

```python
from unittest.mock import patch, MagicMock

class TestExternalModule:
    @patch("modules.my_module.httpx.Client")
    def test_api_call(self, mock_client):
        """Mock HTTP client for external API."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"data": "test"}
        mock_client.return_value.__enter__.return_value.get.return_value = mock_response

        result = json.loads(my_module_handler(param1="test"))
        assert result["success"] is True

    @patch("modules.my_module.os.getenv")
    def test_missing_env_var(self, mock_getenv):
        """Should handle missing env vars."""
        mock_getenv.return_value = None
        result = json.loads(my_module_handler(param1="test"))
        assert result["success"] is False
        assert "API key" in result["error"]
```

### Security Tests

```python
class TestSecurity:
    def test_sql_injection_prevention(self):
        """Should reject SQL injection attempts."""
        malicious_input = {"table_name": "users; DROP TABLE users; --"}
        result = json.loads(my_module_handler(**malicious_input))
        assert result["success"] is False

    def test_path_traversal_prevention(self):
        """Should reject path traversal attempts."""
        malicious_input = {"file_path": "../../etc/passwd"}
        result = json.loads(my_module_handler(**malicious_input))
        assert result["success"] is False
```

### Using conftest Fixtures

```python
# Always use hermetic environment fixtures
def test_with_project_root(isolated_project_home):
    """Tests should use isolated_project_home to avoid writing to real project dir."""
    config_path = isolated_project_home / "config.yaml"
    config_path.write_text("key: value")
    assert config_path.exists()
```

---

## Error Handling Patterns

### Structured Error Responses

```python
from typing import Any, Dict

def success(data: Any) -> str:
    """Return success JSON response."""
    return json.dumps({"success": True, "data": data})

def error(message: str, code: str = "UNKNOWN") -> str:
    """Return error JSON response with code."""
    return json.dumps({"success": False, "error": message, "code": code})

# Usage in module handler
def my_module(param: str) -> str:
    try:
        if not param:
            return error("Parameter 'param' is required")
        result = process(param)
        return success(result)
    except ValidationError as e:
        return error(str(e), "VALIDATION_ERROR")
    except Exception as e:
        logger.exception("Unexpected error")
        return error("Internal processing failed", "INTERNAL_ERROR")
```

### Specific Exception Handling

```python
# CORRECT — Catch specific exceptions
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
except sqlite3.Error as e:
    return error(f"Database error: {e}")
except ValueError as e:
    return error(f"Invalid value: {e}")
finally:
    if conn:
        conn.close()

# WRONG — Catching everything
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
except Exception as e:  # Too broad
    return error(str(e))
finally:
    if conn:
        conn.close()
```

### Error Handling in TypeScript

```typescript
// CORRECT — Discriminated union
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: string };

function handleApiResponse<T>(response: Response): Result<T> {
  if (!response.ok) {
    return {
      success: false,
      error: response.statusText,
      code: `HTTP_${response.status}`,
    };
  }
  return { success: true, data: response.data as T };
}
```

### Error Handling in Rust

```rust
// CORRECT — Typed errors with thiserror
#[derive(Error, Debug)]
pub enum ModuleError {
    #[error("Validation: {0}")]
    Validation(String),
    #[error("Not found: {0}")]
    NotFound(String),
    #[error("Internal: {0}")]
    Internal(#[from] anyhow::Error),
}

pub fn handle_request(input: &str) -> Result<SuccessData, ModuleError> {
    if input.is_empty() {
        return Err(ModuleError::Validation("input is required".into()));
    }
    // ... process
}
```

---

## Configuration Patterns

### Config Interface and Defaults

```python
from dataclasses import dataclass, field
from typing import Any, Dict

@dataclass
class AppConfig:
    api_url: str = "https://api.example.com"
    timeout: int = 30000
    max_retries: int = 3
    enable_debug: bool = False

# Loading config from environment
def load_config() -> AppConfig:
    return AppConfig(
        api_url=os.getenv("API_URL", "https://api.example.com"),
        timeout=int(os.getenv("TIMEOUT", "30000")),
        enable_debug=os.getenv("DEBUG", "").lower() == "true",
    )
```

### Adding a Config Key

```python
# 1. Add a default to the project's config module
# 2. Use project_root for filesystem paths
# 3. Access via config dict at runtime

from project_constants import project_root

def get_my_config() -> str:
    """Get my custom config value."""
    config_path = project_root / "config.yaml"
    # Read and parse config
    ...
```

### Config in TypeScript

```typescript
// CORRECT — Typed config with defaults
interface AppConfig {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 30000,
  maxRetries: 3,
  debug: false,
};

function loadConfig(overrides?: Partial<AppConfig>): AppConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}
```

### Config in Go

```go
// CORRECT — Config struct with defaults
type Config struct {
    APIURL     string        `yaml:"api_url"`
    Timeout    time.Duration `yaml:"timeout"`
    MaxRetries int           `yaml:"max_retries"`
    Debug      bool          `yaml:"debug"`
}

func DefaultConfig() Config {
    return Config{
        APIURL:     "https://api.example.com",
        Timeout:    30 * time.Second,
        MaxRetries: 3,
        Debug:      false,
    }
}

func LoadConfig(path string) (Config, error) {
    cfg := DefaultConfig()
    data, err := os.ReadFile(path)
    if err != nil {
        return cfg, fmt.Errorf("read config: %w", err)
    }
    if err := yaml.Unmarshal(data, &cfg); err != nil {
        return cfg, fmt.Errorf("parse config: %w", err)
    }
    return cfg, nil
}
```

---

## Resource Management Patterns

### Database Connections

```python
# CORRECT — try/finally pattern
def query_database(db_path: str, query: str) -> str:
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        return json.dumps({"success": True, "data": results})
    except sqlite3.Error as e:
        return json.dumps({"success": False, "error": str(e)})
    finally:
        if conn:
            conn.close()

# WRONG — Connection leak
def query_database(db_path: str, query: str) -> str:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()  # If error above, this never runs
    return json.dumps({"success": True, "data": results})
```

### Resource Management in Go

```go
// CORRECT — Deferred cleanup
func QueryDatabase(db *sql.DB, query string) ([]Row, error) {
    rows, err := db.QueryContext(ctx, query)
    if err != nil {
        return nil, fmt.Errorf("query: %w", err)
    }
    defer rows.Close()

    var results []Row
    for rows.Next() {
        var r Row
        if err := rows.Scan(&r.ID, &r.Name); err != nil {
            return nil, fmt.Errorf("scan: %w", err)
        }
        results = append(results, r)
    }
    return results, rows.Err()
}
```

### Atomic File Writes

```python
import os
from pathlib import Path

def atomic_write(path: Path, data: str) -> None:
    """Write data atomically using tmp + replace pattern."""
    tmp = path.with_suffix(f".{os.getpid()}.tmp")
    try:
        tmp.write_text(data, encoding="utf-8")
        tmp.replace(path)
    except Exception:
        if tmp.exists():
            tmp.unlink()
        raise

# CORRECT usage
atomic_write(config_path, yaml.dump(config))

# WRONG — Partial write on crash
config_path.write_text(yaml.dump(config))  # If crash mid-write, file is corrupted
```

### Signal Handling

```python
import signal
import sys

def setup_timeout_handler(seconds: int):
    """Set up timeout handler with Windows fallback."""
    if sys.platform == "win32":
        logger.warning("Timeout enforcement not available on Windows")
        return

    def handler(signum, frame):
        raise TimeoutError(f"Operation timed out after {seconds}s")

    signal.signal(signal.SIGALRM, handler)
    signal.alarm(seconds)

# WRONG — No Windows guard
signal.signal(signal.SIGALRM, handler)  # AttributeError on Windows
```

### Defer in Go

```go
// CORRECT — Defer immediately after acquisition
func ProcessFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close()

    mu.Lock()
    defer mu.Unlock()

    // ... process ...
    return nil
}

// WRONG — Defer far from acquisition
func ProcessFile(path string) error {
    f, err := os.Open(path)
    // ... 20 lines of setup ...
    defer f.Close() // Hard to verify correctness
    // ...
}
```

---

## Naming Conventions

### Python Naming

```python
# CORRECT — snake_case for functions and variables
def get_user_data(user_id: str) -> Optional[User]:
    ...
max_retries = 3
is_active = True

# WRONG — camelCase in Python
def getUserData(userId: str) -> Optional[User]:
    ...
maxRetries = 3
```

### TypeScript Naming

```typescript
// CORRECT — camelCase for JS/TS
function getUserData(userId: string): User | null {
  ...
}
const maxRetries = 3;

// CORRECT — PascalCase for classes and components
class UserService { ... }
function UserProfile(props: UserProfileProps) { ... }

// WRONG — snake_case in TypeScript
function get_user_data(user_id: string): User | null { ... }
```

### Rust Naming

```rust
// CORRECT — snake_case for functions, CamelCase for types
fn get_user_data(user_id: &str) -> Option<User> { ... }
struct UserService { ... }
enum ApiError { ... }
const MAX_RETRIES: u32 = 3;

// WRONG
fn getUserData(userId: &str) -> Option<User> { ... }
```

### Go Naming

```go
// CORRECT — CamelCase for exported, camelCase for unexported
func GetUserData(userID string) (*User, error) { ... }
func validateInput(input string) error { ... }

const MaxRetries = 3
const defaultTimeout = 30

// WRONG
func get_user_data(user_id string) (*User, error) { ... }
```

### File Naming

```python
# CORRECT — snake_case for Python, kebab-case for most others
# user_service.py
# http-request-handler.ts
# config-manager.go

# WRONG — mixed conventions
# userService.py
# http_request_handler.ts
```

### Class Naming

```python
# CORRECT — PascalCase for classes
class UserService:
    ...

class ConfigManager:
    ...

# WRONG — snake_case for classes
class user_service:
    ...
```

### Constant Naming

```python
# CORRECT — UPPER_SNAKE_CASE for constants
MAX_BUFFER_SIZE = 1024
DEFAULT_TIMEOUT = 30000
API_VERSION = "v1"

# CORRECT — Module-level constants with docstring
# Pricing in $ per million tokens. Approximate — check provider docs.
MODEL_COST_PER_MTOK = {
    "claude-sonnet-4": {"input": 15.0, "output": 75.0},
}
```

---

## Import Patterns

### Standard Python Import Order

```python
# 1. Standard library (alphabetical)
import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

# 2. Third-party packages (alphabetical)
import yaml
from pytest import fixture

# 3. Project internal (alphabetical by module)
from project_constants import project_root
from modules.registry import registry

# 4. Local/relative imports (alphabetical)
from .helpers import format_result
```

### TypeScript Import Order

```typescript
// 1. Node built-ins
import { readFile } from "fs/promises";
import { join } from "path";

// 2. Third-party
import express from "express";
import { z } from "zod";

// 3. Project internal (sorted by path depth)
import { User } from "@/types/user";
import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
```

### Safe Import Practices

```python
# CORRECT — Safe imports for module files
import json
import os
from typing import Optional

from modules.registry import registry  # registry has NO deps

# WRONG — Circular import risk
from core_agent import CoreAgent  # modules should never import the agent
from tool_orchestration import handle_call  # modules should never import orchestration
```

---

## File Structure

### Generic Project Structure

```
my-project/
├── modules/                  # Module/tool implementations
│   ├── registry.py           # Module registry (zero deps)
│   ├── your_module.py        # Your new module
│   └── backends/             # Backend implementations
├── core/                     # Core internals
│   ├── agent.py              # Core agent module
│   └── orchestration.py      # Tool orchestration module
├── cli/                      # CLI and config
│   ├── config.py             # DEFAULT_CONFIG
│   ├── plugin_system.py      # Project's plugin system
│   └── skin_engine.py        # Theming
├── gateway/                  # Messaging gateway
│   └── platforms/            # Platform adapters
├── plugins/                  # Plugin implementations
├── tests/                    # Test suite
│   ├── modules/
│   │   └── test_your_module.py
│   ├── conftest.py           # Hermetic env fixtures
│   └── ...
├── pyproject.toml
├── AGENTS.md
├── CONTRIBUTING.md
└── README.md
```

### Module File Template

```python
# modules/your_module.py
import json
from typing import Any, Dict, Optional

from modules.registry import registry

def check_requirements() -> bool:
    """Check if required environment is available."""
    return True

def your_module(param: str, task_id: Optional[str] = None) -> str:
    """Brief description.

    Args:
        param: Parameter description
        task_id: Task tracking identifier

    Returns:
        JSON string with result
    """
    try:
        result = {"success": True, "data": {"processed": param}}
        return json.dumps(result)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

# Use the project's registration API
registry.register(
    name="your_module",
    category="file",
    schema={
        "name": "your_module",
        "description": "Brief description under 60 chars.",
        "parameters": {
            "type": "object",
            "properties": {
                "param": {
                    "type": "string",
                    "description": "Parameter description"
                }
            },
            "required": ["param"]
        }
    },
    handler=lambda args, **kw: your_module(
        param=args.get("param", ""),
        task_id=kw.get("task_id"),
    ),
    check_fn=check_requirements,
)
```

### TypeScript File Structure

```
src/
├── types/              # Type definitions
│   ├── user.ts
│   └── api.ts
├── api/                # API client layer
│   ├── client.ts
│   └── endpoints.ts
├── components/         # React components
│   ├── common/
│   ├── features/
│   └── layouts/
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── test/               # Tests mirror src/
│   ├── api/
│   ├── components/
│   └── hooks/
├── index.tsx
└── tsconfig.json
```

### Rust File Structure

```
src/
├── main.rs             # Entry point
├── lib.rs              # Library root
├── config/
│   ├── mod.rs
│   └── settings.rs
├── handlers/
│   ├── mod.rs
│   ├── user_handler.rs
│   └── module_handler.rs
├── models/
│   ├── mod.rs
│   └── user.rs
├── error.rs            # Error types
├── cli.rs              # CLI argument parsing
└── tests/              
    ├── integration/
    └── unit/
```

### Go File Structure

```
cmd/
├── my-app/
│   └── main.go
internal/
├── config/
│   └── config.go
├── handler/
│   ├── user.go
│   └── module.go
├── model/
│   └── user.go
├── repository/
│   └── user_repo.go
├── service/
│   └── user_service.go
pkg/
├── api/
│   ├── client.go
│   └── middleware.go
└── testutil/
    └── fixtures.go
```

---

## Security Patterns

### SQL Injection Prevention

```python
# ABSOLUTE RULE: No f-strings in SQL queries

# CORRECT — Parameterized query
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# CORRECT — Named parameters
cursor.execute(
    "INSERT INTO test (name, value) VALUES (:name, :value)",
    {"name": "test", "value": 1}
)

# WRONG — SQL injection vulnerability
cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")

# For identifiers (table/column names that can't be parameterized):
if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", table_name):
    return json.dumps({"success": False, "error": "Invalid table name"})
cursor.execute(f"PRAGMA table_info(\"{table_name}\")")  # Safe after validation
```

### Shell Injection Prevention

```python
import subprocess

# CORRECT — Using argv array
result = subprocess.run(
    ["git", "log", "--oneline", "-5"],
    capture_output=True,
    text=True
)

# WRONG — Shell injection risk
result = subprocess.run(
    f"git log --oneline -5 {user_input}",
    shell=True,
    capture_output=True,
    text=True
)

# WRONG — os.system
os.system("git log --oneline -5")
```

### Shell Injection in Go

```go
// CORRECT — Using exec with args
cmd := exec.Command("git", "log", "--oneline", "-5")
output, err := cmd.Output()

// WRONG — Shell injection risk
cmd := exec.Command("sh", "-c", fmt.Sprintf("git log --oneline -5 %s", userInput))
```

### Path Traversal Prevention

```python
from pathlib import Path

# CORRECT — Use path validation utilities
def read_user_file(user_path: str, base_dir: Path) -> str:
    """Read file, preventing path traversal."""
    resolved = (base_dir / user_path).resolve()
    if not str(resolved).startswith(str(base_dir.resolve())):
        return json.dumps({"success": False, "error": "Path traversal detected"})
    return resolved.read_text(encoding="utf-8")

# WRONG — Path traversal vulnerability
def read_user_file(user_path: str) -> str:
    """Vulnerable to ../../etc/passwd."""
    return Path(user_path).read_text()
```

### Secret Management

```python
# CORRECT — Use environment variables
api_key = os.getenv("EXAMPLE_API_KEY")
if not api_key:
    return json.dumps({"success": False, "error": "API key not configured"})

# CORRECT — Test secrets use TEST_KEY_ prefix
TEST_API_KEY = "TEST_KEY_abc123"  # Safe for tests

# WRONG — Hardcoded real-looking secret
API_KEY = "sk_live_abc123def456"  # Will trigger secret scanning

# WRONG — Hardcoded in source
API_KEY = "my-real-api-key-12345"
```

### Input Validation

```python
import re

def validate_email(email: str) -> bool:
    """Validate email format."""
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))

def sanitize_filename(filename: str) -> str:
    """Remove path separators and dangerous characters."""
    # Only allow alphanumeric, dots, hyphens, underscores
    sanitized = re.sub(r"[^\w\-.]", "", filename)
    # Prevent empty result
    if not sanitized:
        sanitized = "unnamed"
    return sanitized
```

### Rate Limiting

```python
import time
from collections import defaultdict
from threading import Lock

class RateLimiter:
    """Token-bucket rate limiter."""

    def __init__(self, max_calls: int = 10, period: float = 1.0):
        self.max_calls = max_calls
        self.period = period
        self.calls: Dict[str, list] = defaultdict(list)
        self.lock = Lock()

    def is_allowed(self, key: str) -> bool:
        """Check if call is within rate limit."""
        with self.lock:
            now = time.monotonic()
            window_start = now - self.period
            self.calls[key] = [t for t in self.calls[key] if t > window_start]

            if len(self.calls[key]) >= self.max_calls:
                return False

            self.calls[key].append(now)
            return True

# Usage
rate_limiter = RateLimiter(max_calls=5, period=1.0)
if not rate_limiter.is_allowed("api_call"):
    return json.dumps({"success": False, "error": "Rate limited"})
```

### Content Security (XSS Prevention)

```python
import html

def format_user_input(user_input: str) -> str:
    """Escape HTML to prevent XSS."""
    return html.escape(user_input, quote=True)

# WRONG — Renders raw user input
def format_user_input(user_input: str) -> str:
    return f"<div>{user_input}</div>"
```

### Dependency Pinning

```python
# CORRECT — Upper bounds on all dependencies
# pyproject.toml
# dependencies = [
#     "httpx>=0.28.1,<1",
#     "pydantic>=2.0,<3",
#     "pyyaml>=6.0,<7",
# ]

# WRONG — No upper bound (supply chain risk)
# dependencies = [
#     "httpx>=0.28.1",
#     "pydantic>=2.0",
# ]
```

---

## Always Remember

### The Golden Rules

1. **Match the existing code** — If it uses `snake_case`, use `snake_case`
2. **Match the existing structure** — If there's a `modules/` folder, put modules there
3. **Match the existing tests** — If tests use pytest, use pytest
4. **Type everything** — No untyped functions, always explicit types
5. **Handle errors** — Always wrap in try/except with specific exceptions
6. **Close resources** — Always use try/finally or defer for connections
7. **Security first** — No SQL injection, no shell injection, no secrets

### When in Doubt

- Copy exactly from existing code
- Look at similar files in the codebase
- Ask in issues before implementing
- Run the project's linter and type checker to verify

### Final Checklist

- [ ] Functions have type hints
- [ ] Parameters have types
- [ ] Return types are declared
- [ ] Docstrings on public functions
- [ ] Error handling is in place
- [ ] Resources managed (try/finally / defer)
- [ ] Tests are written
- [ ] Code follows naming conventions
- [ ] Imports are in correct order
- [ ] No SQL injection
- [ ] No shell injection
- [ ] No path traversal
- [ ] No hardcoded secrets
- [ ] No phantom references
- [ ] Follows the project's registration pattern

---

*Last updated: May 2026*
*Location: AI-Code/Jiggy-2026-PR/core/patterns.md*
*Purpose: Show exact patterns to follow for any OSS project contribution*
*Note: These patterns are based on real codebase review experiences and are language-agnostic. Adapt conventions to match the specific project's existing code.*
