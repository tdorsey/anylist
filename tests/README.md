# Integration Tests

This document describes the integration tests for the AnyList library.

## Overview

The integration tests in `tests/integration.test.js` validate the interactions between different components of the AnyList library without making actual API calls to the AnyList service. Instead, they use mocked HTTP clients and protobuf objects to test the integration logic.

## Test Structure

### Test Categories

1. **Item Integration** - Tests for creating, updating, and managing shopping list items
2. **List Integration** - Tests for shopping list operations (add items, remove items, find by name)
3. **Recipe Integration** - Tests for recipe creation, saving, and deletion
4. **Recipe Collection Integration** - Tests for recipe collection management
5. **Meal Planning Calendar Event Integration** - Tests for calendar event creation and management
6. **End-to-End Integration Workflows** - Complete workflow tests that combine multiple operations
7. **Error Handling Integration** - Tests for error scenarios and edge cases

### Test Approach

- **Mocked Dependencies**: All HTTP requests and protobuf operations are mocked to avoid external dependencies
- **Component Integration**: Tests focus on how different classes interact with each other
- **Real Object Behavior**: Uses actual class instances with mocked dependencies to test real integration logic

## Key Test Features

### Mocked Components

- **HTTP Client**: Mocked to return successful responses without making real API calls
- **Protobuf Objects**: All protobuf constructors and methods are mocked to simulate serialization
- **File System**: Credential storage operations are mocked

### Test Coverage

The tests cover:

- Object creation and initialization
- Property setters and getters
- API call integration (with mocked responses)
- Cross-component interactions
- Error handling and validation
- Complete workflow scenarios

### Example Workflows Tested

1. **Shopping List Management**:
   - Create list → Add items → Update items → Remove items

2. **Recipe Management**:
   - Create recipe → Save to API → Create collection → Add recipe to collection → Create calendar event

## Running Tests

```bash
# Run all tests (lint + integration)
npm test

# Run only integration tests
npm run test:integration

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode for development
npm run test:watch
```

## Test Configuration

The tests are configured in `package.json`:

- **Test Environment**: Node.js
- **Test Framework**: Jest
- **Linting**: XO with Jest environment support
- **Coverage**: Collects coverage from `lib/**/*.js`

## Benefits

1. **No External Dependencies**: Tests run quickly without requiring API credentials or network access
2. **Comprehensive Coverage**: Tests all major integration points between components
3. **Error Scenario Testing**: Validates error handling and edge cases
4. **CI/CD Ready**: Tests can run in any environment without special setup
5. **Documentation**: Tests serve as integration examples for library usage

## Future Enhancements

Potential improvements for the test suite:

1. **Real API Integration Tests**: Optional tests with real credentials for end-to-end validation
2. **Performance Testing**: Add timing assertions for operations
3. **Stress Testing**: Test with large datasets
4. **Compatibility Testing**: Test with different Node.js versions
5. **Snapshot Testing**: Add snapshot tests for protobuf serialization