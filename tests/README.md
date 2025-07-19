# AnyList API Cross-Language Testing

This directory contains comprehensive test suites for both JavaScript and Python implementations of the AnyList API.

## Overview

The AnyList API has been implemented in two languages to ensure broad accessibility:
- **JavaScript** (original implementation in `/lib/`)
- **Python** (new implementation in `/tests/python/anylist_python/`)

This testing framework ensures both implementations maintain the same functionality and behavior.

## Directory Structure

```
tests/
├── javascript/               # JavaScript test suite
│   └── test-specs.js        # Jest tests for JS implementation
├── python/                  # Python implementation and tests
│   ├── anylist_python/      # Python API implementation
│   │   └── __init__.py     # Main Python module
│   ├── test_specs.py       # pytest tests for Python implementation
│   └── requirements.txt    # Python dependencies
├── shared/                  # Shared documentation
│   └── API_TEST_SPECIFICATIONS.md  # Test specifications
├── package.json            # Test runner configuration
└── README.md              # This file
```

## Running Tests

### Prerequisites

**For JavaScript tests:**
- Node.js 16+ 
- npm or yarn

**For Python tests:**
- Python 3.9+
- pip

### Individual Test Suites

**JavaScript tests:**
```bash
cd tests
npm install
npm run test:js
```

**Python tests:**
```bash
cd tests/python
pip install -r requirements.txt
python -m pytest test_specs.py -v
```

### Run All Tests
```bash
cd tests
npm install
npm run test:all
```

### Test Options

**JavaScript test options:**
```bash
npm run test:js:watch    # Watch mode for development
```

**Python test options:**
```bash
# With detailed output
python -m pytest test_specs.py -v --tb=long

# Run specific test class
python -m pytest test_specs.py::TestAnyListAPI -v

# Run async tests only
python -m pytest test_specs.py::TestAnyListAPIAsync -v
```

## Test Coverage

Both test suites cover:

### ✅ Core API Structure
- AnyList class instantiation
- Event emitter functionality
- Core properties and methods

### ✅ Item Management
- Creating items with various properties
- Property getters and setters
- Save functionality

### ✅ Recipe Management
- Creating recipes with metadata
- Ingredients and preparation steps
- Save and delete operations

### ✅ Calendar Events
- Event creation and management
- CRUD operations

### ✅ Recipe Collections
- Collection creation
- Adding/removing recipes

### ✅ List Management
- List lookup by name and ID
- Null handling for non-existent items

### ✅ Async Support (Python)
- Async login functionality
- Async data retrieval
- Promise/Task handling

## GitHub Workflow

The cross-language testing is automated via GitHub Actions:

```yaml
# .github/workflows/cross-language-testing.yml
- Runs JavaScript tests on Node.js 16, 18, 20
- Runs Python tests on Python 3.9, 3.10, 3.11, 3.12
- Generates compatibility reports
- Verifies API contract consistency
```

## API Contract

Both implementations must satisfy the same API contract:

### Core Methods
- `login()` - Authentication
- `get_lists()` - Retrieve lists  
- `get_recipes()` - Retrieve recipes
- `create_item(data)` - Create item
- `create_recipe(data)` - Create recipe
- `create_event(data)` - Create calendar event
- `create_recipe_collection(data)` - Create recipe collection

### Helper Methods
- `get_list_by_name(name)` - Find list by name
- `get_list_by_id(id)` - Find list by ID
- `teardown()` - Cleanup resources

### Event Emitter (Both Implementations)
- `on(event, callback)` - Add listener
- `emit(event, ...args)` - Emit event
- `remove_listener(event, callback)` - Remove listener

## Development Workflow

### Adding New Tests
1. Add test to JavaScript suite first (`javascript/test-specs.js`)
2. Mirror the test in Python suite (`python/test_specs.py`)
3. Ensure both implementations pass
4. Update documentation if needed

### Modifying API
1. Update both implementations simultaneously
2. Update corresponding tests
3. Verify backward compatibility
4. Run full test suite

### Continuous Integration
The GitHub workflow ensures:
- All tests pass on multiple runtime versions
- Cross-language compatibility is maintained
- Changes don't break existing functionality

## Test Philosophy

### Isolation
- Tests don't make real network requests
- Use mock contexts and dependencies
- Focus on API structure and behavior

### Behavioral Consistency
- Same inputs produce equivalent outputs
- Property setters work identically
- Method signatures match between implementations

### Future-Proof
- Tests serve as living documentation
- API contract is explicitly defined
- Breaking changes are caught early

## Troubleshooting

### Common Issues

**JavaScript tests failing:**
```bash
# Ensure dependencies are installed
cd tests && npm install

# Check Node.js version
node --version  # Should be 16+
```

**Python tests failing:**
```bash
# Ensure Python dependencies are installed
cd tests/python && pip install -r requirements.txt

# Check Python version
python --version  # Should be 3.9+

# Install in development mode if import issues
pip install -e .
```

**Import errors:**
- Ensure you're running tests from correct directory
- Check that `anylist_python` module is in Python path
- Verify all dependencies are installed

### Getting Help

1. Check test specifications: `shared/API_TEST_SPECIFICATIONS.md`
2. Review GitHub Actions logs for CI failures
3. Compare working test examples between languages
4. Ensure all dependencies are correctly installed

## Contributing

When contributing to either implementation:

1. **Write tests first** - Define expected behavior
2. **Maintain compatibility** - Both implementations should pass same tests  
3. **Update documentation** - Keep specifications current
4. **Test thoroughly** - Run both test suites before submitting

## Success Metrics

✅ **Cross-language compatibility achieved when:**
- All JavaScript tests pass
- All Python tests pass
- Same behavioral contracts satisfied
- GitHub workflow completes successfully
- API documentation is up-to-date

This testing framework ensures users can confidently choose either JavaScript or Python implementation based on their needs, knowing both provide identical functionality.