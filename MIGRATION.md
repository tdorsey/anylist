# Migration Guide: JavaScript to Python

This document helps users migrate from the JavaScript version of AnyList to the Python version.

## Installation

**JavaScript (old):**
```bash
npm install anylist
```

**Python (new):**
```bash
pip install anylist
# or
uv add anylist
```

## Basic Usage

**JavaScript (old):**
```javascript
const AnyList = require('anylist');

const any = new AnyList({email: 'hi@here.com', password: 'password'});

any.login().then(async () => {
  await any.getLists();
  // ...
  any.teardown();
});
```

**Python (new):**
```python
import asyncio
from anylist import AnyList

async def main():
    any_list = AnyList(email='hi@here.com', password='password')
    
    await any_list.login()
    await any_list.get_lists()
    # ...
    await any_list.teardown()

asyncio.run(main())
```

## Method Name Changes

| JavaScript | Python |
|------------|--------|
| `getLists()` | `get_lists()` |
| `getListByName()` | `get_list_by_name()` |
| `getListById()` | `get_list_by_id()` |
| `createItem()` | `create_item()` |
| `addItem()` | `add_item()` |
| `removeItem()` | `remove_item()` |
| `getItemByName()` | `get_item_by_name()` |
| `createRecipe()` | `create_recipe()` |
| `getRecipes()` | `get_recipes()` |
| `createRecipeCollection()` | `create_recipe_collection()` |
| `addRecipe()` | `add_recipe()` |
| `removeRecipe()` | `remove_recipe()` |

## Property Name Changes

| JavaScript | Python |
|------------|--------|
| `preparationSteps` | `preparation_steps` |
| `sourceName` | `source_name` |
| `sourceUrl` | `source_url` |
| `scaleFactor` | `scale_factor` |
| `nutritionalInfo` | `nutritional_info` |
| `cookTime` | `cook_time` |
| `prepTime` | `prep_time` |
| `creationTimestamp` | `creation_timestamp` |
| `manualSortIndex` | `manual_sort_index` |
| `categoryMatchId` | `category_match_id` |

## Constructor Options

**JavaScript (old):**
```javascript
const any = new AnyList({
  email: 'hi@here.com',
  password: 'password',
  credentialsFile: '/path/to/credentials'
});
```

**Python (new):**
```python
any_list = AnyList(
    email='hi@here.com',
    password='password',
    credentials_file='/path/to/credentials'  # or None to disable
)
```

## Event Handling

**JavaScript (old):**
```javascript
any.on('lists-update', lists => {
  console.log('Lists were updated!');
});
```

**Python (new):**
Event handling is not yet implemented in the Python version. This is a placeholder for future enhancement.

## Key Differences

1. **Async/Await**: Python version uses proper async/await syntax throughout
2. **Snake Case**: Python follows PEP 8 naming conventions (snake_case instead of camelCase)
3. **Type Hints**: Python version includes comprehensive type hints for better IDE support
4. **Error Handling**: Uses Python exceptions instead of JavaScript error patterns
5. **Module System**: Uses Python import system instead of CommonJS require

## Dependencies

The Python version uses modern, well-maintained libraries:
- `httpx` for HTTP requests (replaces `got`)
- `websockets` for WebSocket connections (replaces `ws`/`reconnecting-websocket`)
- `cryptography` for encryption (replaces Node.js `crypto`)
- `protobuf` for protocol buffer handling (replaces `protobufjs`)

## Development

**JavaScript (old):**
```bash
yarn install
yarn test
yarn run document
```

**Python (new):**
```bash
uv sync
uv run ruff check src/
uv run black src/
uv run mypy src/
```