# 📋 AnyList

![python](https://img.shields.io/pypi/pyversions/anylist)
[![PyPI version](https://badge.fury.io/py/anylist.svg)](https://badge.fury.io/py/anylist)

## a wrapper for AnyList's API (unofficial, reverse engineered)

### Install

`pip install anylist`

or with uv:

`uv add anylist`

### Getting Started

Here's an example script (replace `email` and `password` with your credentials):

```python
import asyncio
from anylist import AnyList

async def main():
    any_list = AnyList(email='hi@here.com', password='password')

    # Event handler for list updates
    def on_lists_update(lists):
        print('Lists were updated!')

    # Login to AnyList
    await any_list.login()

    # Get all lists
    await any_list.get_lists()

    # Add new item to the Walmart list
    walmart = any_list.get_list_by_name('Walmart')
    if walmart:
        chips = any_list.create_item({'name': 'Chips'})
        chips = await walmart.add_item(chips)

        # Check off added item
        chips.checked = True
        # And change the quantity
        chips.quantity = '2'
        # Save updated item
        await chips.save()

        # Delete item
        await walmart.remove_item(chips)

    # Add a new calendar event
    cal_event = await any_list.create_event({'title': "Do Laundry"})
    await cal_event.save()

    await any_list.teardown()

# Run the async main function
asyncio.run(main())
```

### Getting Started with Recipes

```python
import asyncio
import time
from anylist import AnyList

async def main():
    any_list = AnyList(email='hi@here.com', password='password')

    await any_list.login()

    recipe_name = 'Congee recipe'
    test_recipe = await any_list.create_recipe({
        'name': recipe_name,
        'note': 'this is a test note',
        'preparationSteps': ['# heading 1', 'this is preparation step 1'],
        'servings': '2 servings as main dish',
        'sourceName': 'serious eats',
        'sourceUrl': 'https://seriouseats.com',
        'scaleFactor': 1,
        'rating': 5,
        'ingredients': [{
            'rawIngredient': '1 garlic, chopped',
            'name': 'garlic',
            'quantity': '1',
            'note': 'chopped'
        }],
        'nutritionalInfo': 'this is nutritional info',
        'cookTime': 5 * 60,  # seconds
        'prepTime': 5 * 60,  # seconds
        'creationTimestamp': time.time(),
        'timestamp': time.time()
    })

    # Save test recipe
    await test_recipe.save()

    collection = any_list.create_recipe_collection({'name': 'ONLINE RECIPES'})
    await collection.save()
    await collection.add_recipe(test_recipe.identifier)
    await collection.remove_recipe(test_recipe.identifier)

    # clean up / delete test recipe collection
    await collection.delete()

    # cleanup / delete test recipe
    await test_recipe.delete()

    await any_list.teardown()

asyncio.run(main())
```

### Persistent Credentials Storage
By default, the client ID and authentication tokens are encrypted with AES-256 encryption using your account password and then stored to disk. The default storage location is the `.anylist_credentials` file in the user home directory. If you wish to change the storage location, set the `credentials_file` parameter of the `AnyList` constructor to the desired path. If you wish to disable persistent credentials storage, set the `credentials_file` parameter to `None`.

### Notes/Tips

- There is **much** more functionality in the AnyList API that is not captured in this package, I just implemented the functions that I would be using. If there is functionality missing that you want, please open a PR and I'm happy to merge it in.
  - (This means that you can't currently add/remove/update lists.)
- When adding new items, you should reuse existing, checked-off items if possible like the official clients do. Search the list by the item name with `list.get_item_by_name('item-name')` to see if it exists before adding a new instance.

### Development

This project uses uv for dependency management and follows modern Python best practices.

```bash
# Install uv if you haven't already
pip install uv

# Install dependencies
uv sync

# Run linting
uv run ruff check src/

# Format code
uv run black src/

# Type checking
uv run mypy src/
```

### 📖 Docs

Documentation is available at the [repository](https://github.com/codetheweb/anylist).
