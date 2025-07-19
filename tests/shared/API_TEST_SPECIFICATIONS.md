# Cross-Language API Testing Specifications

This document defines the shared test specifications that both the JavaScript and Python implementations of the AnyList API must satisfy.

## Overview

The AnyList API has been implemented in two languages:
- **JavaScript** (original implementation in `/lib/`)
- **Python** (new implementation in `/tests/python/anylist_python/`)

Both implementations must pass the same functional tests to ensure API compatibility and behavioral consistency.

## Test Structure

### JavaScript Tests (`/tests/javascript/test-specs.js`)
- Uses Jest testing framework
- Tests the original JavaScript implementation
- Focuses on API structure and behavior validation
- Avoids network calls to ensure reliable testing

### Python Tests (`/tests/python/test_specs.py`)
- Uses pytest with asyncio support
- Tests the Python implementation
- Mirrors the JavaScript test specifications
- Validates same API contract and behavior

## Test Categories

### 1. Core API Structure
Both implementations must provide:
- ✅ AnyList main class with correct constructor
- ✅ Event emitter functionality (`on`, `emit`, `remove_listener`)
- ✅ Core properties: `email`, `password`, `lists`, `recipes`, `favorite_items`, `recent_items`

### 2. UUID Generation
- ✅ Generate unique string identifiers
- ✅ Different IDs on subsequent calls
- ✅ Non-empty string values

### 3. Item Management
Both implementations must support:
- ✅ Creating items with basic properties (`name`)
- ✅ Creating items with complex properties (`quantity`, `details`, `checked`, etc.)
- ✅ Property getters and setters
- ✅ `save()` method for persistence
- ✅ Proper identifier assignment

### 4. Recipe Management
Both implementations must support:
- ✅ Creating recipes with basic properties
- ✅ Creating recipes with complex properties (`ingredients`, `steps`, `timing`, etc.)
- ✅ `save()` and `delete()` methods
- ✅ All recipe metadata fields

### 5. Calendar Event Management
Both implementations must support:
- ✅ Creating calendar events
- ✅ `save()` and `delete()` methods
- ✅ Event properties (`title`, etc.)

### 6. Recipe Collection Management
Both implementations must support:
- ✅ Creating recipe collections
- ✅ `save()` and `delete()` methods
- ✅ `add_recipe()` and `remove_recipe()` methods

### 7. List Management
Both implementations must support:
- ✅ `get_list_by_name()` method
- ✅ `get_list_by_id()` method
- ✅ Proper null/None returns for non-existent items

### 8. Authentication Structure (Python Async)
Python implementation must additionally support:
- ✅ Async `login()` method
- ✅ Async `get_lists()` method
- ✅ Async `get_recipes()` method

## API Contract Requirements

### Method Signatures
Both implementations must provide these methods:

**Core Methods:**
- `login()` - Authentication
- `get_lists()` - Retrieve lists
- `get_recipes()` - Retrieve recipes
- `create_item(data)` - Create new item
- `create_recipe(data)` - Create new recipe
- `create_event(data)` - Create calendar event
- `create_recipe_collection(data)` - Create recipe collection
- `teardown()` - Cleanup resources

**Helper Methods:**
- `get_list_by_name(name)` - Find list by name
- `get_list_by_id(id)` - Find list by ID

### Data Structure Requirements

**Item Properties:**
- `identifier` (string)
- `name` (string)
- `quantity` (string, optional)
- `details` (string, optional)
- `checked` (boolean)
- `list_id` (string)
- `save()` method

**Recipe Properties:**
- `identifier` (string)
- `name` (string)
- `note` (string)
- `preparation_steps` (array)
- `servings` (string)
- `rating` (number)
- `ingredients` (array)
- `cook_time` (number, seconds)
- `prep_time` (number, seconds)
- `save()` and `delete()` methods

**List Properties:**
- `identifier` (string)
- `name` (string)
- `items` (array)
- `add_item()` and `remove_item()` methods

## Testing Strategy

### 1. Isolation Testing
- Tests don't make real network requests
- Use mock contexts and dependencies
- Focus on API structure and local behavior

### 2. Behavioral Consistency
- Same input should produce equivalent output
- Property setters should work identically
- Method signatures should match

### 3. Error Handling
- Invalid inputs should be handled consistently
- Type errors should be thrown appropriately
- Null/undefined handling should match

### 4. Async Compatibility (Python)
- Python implementation supports both sync and async patterns
- Async methods return Promises/Tasks appropriately
- Event emitter pattern works with both paradigms

## Running Tests

### JavaScript Tests
```bash
cd tests
npm install
npm run test:js
```

### Python Tests
```bash
cd tests/python
pip install -r requirements.txt
python -m pytest test_specs.py -v
```

### Both Tests (via GitHub Workflow)
```bash
npm run test:all
```

## Continuous Integration

The GitHub workflow (`cross-language-testing.yml`) ensures:
1. Both test suites pass on multiple runtime versions
2. Cross-language compatibility is verified
3. Compatibility reports are generated
4. Test artifacts are preserved

## Future Enhancements

### Planned Test Additions
- Integration tests with mock API endpoints
- Performance comparison benchmarks
- Memory usage analysis
- Real authentication flow testing (with test credentials)

### Test Coverage Goals
- [ ] Network request mocking and testing
- [ ] WebSocket connection testing
- [ ] Error condition handling
- [ ] Data persistence testing
- [ ] Complex workflow testing (full CRUD operations)

## Maintenance

### Adding New Tests
1. Add test to JavaScript test suite first
2. Mirror the test in Python test suite
3. Ensure both implementations pass
4. Update this specification document

### Modifying Existing Tests
1. Update both test suites simultaneously
2. Verify backward compatibility
3. Update API contract documentation
4. Run full test suite before merging

## Success Criteria

✅ **Cross-language compatibility confirmed when:**
- All JavaScript tests pass
- All Python tests pass  
- Same behavioral contracts are satisfied
- API signatures match between implementations
- GitHub workflow completes successfully

This testing framework ensures that users can confidently switch between JavaScript and Python implementations while maintaining the same functionality and behavior.