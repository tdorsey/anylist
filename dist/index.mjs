var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import { EventEmitter } from "events";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { Buffer as Buffer2 } from "buffer";
import got from "got";
import WebSocket from "reconnecting-websocket";
import WS from "ws";
import * as protobuf from "protobufjs";
import FormData6 from "form-data";

// src/definitions.json
var definitions_exports = {};
__export(definitions_exports, {
  default: () => definitions_default,
  messages: () => messages,
  package: () => package2
});
var package2 = "pcov.proto";
var messages = [
  {
    name: "User",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "id",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "email",
        id: 3
      },
      {
        rule: "optional",
        type: "int64",
        name: "created",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "firstName",
        id: 15
      },
      {
        rule: "optional",
        type: "string",
        name: "lastName",
        id: 16
      },
      {
        rule: "optional",
        type: "bool",
        name: "isPremiumUser",
        id: 37
      },
      {
        rule: "repeated",
        type: "string",
        name: "pushTokens",
        id: 24
      },
      {
        rule: "repeated",
        type: "string",
        name: "fcmTokens",
        id: 42
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedUserFavorites",
        id: 36
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeDataId",
        id: 35
      },
      {
        rule: "optional",
        type: "string",
        name: "listDataId",
        id: 38
      },
      {
        rule: "optional",
        type: "string",
        name: "facebookUserId",
        id: 39
      },
      {
        rule: "optional",
        type: "string",
        name: "icalendarId",
        id: 43
      },
      {
        rule: "optional",
        type: "int32",
        name: "freeRecipeImportsRemainingCount",
        id: 40
      },
      {
        rule: "optional",
        type: "string",
        name: "otpSecret",
        id: 41
      },
      {
        rule: "repeated",
        type: "string",
        name: "orderedStarterListIds",
        id: 33
      },
      {
        rule: "optional",
        type: "double",
        name: "orderedStarterListIdsTimestamp",
        id: 34
      },
      {
        rule: "optional",
        type: "bool",
        name: "notify",
        id: 6
      },
      {
        rule: "optional",
        type: "double",
        name: "savedRecipesTimestamp",
        id: 25
      },
      {
        rule: "optional",
        type: "double",
        name: "listSettingsTimestamp",
        id: 28
      },
      {
        rule: "optional",
        type: "double",
        name: "listSettingsRequireRefreshTimestamp",
        id: 29
      },
      {
        rule: "optional",
        type: "double",
        name: "starterListSettingsTimestamp",
        id: 30
      },
      {
        rule: "optional",
        type: "double",
        name: "starterListSettingsRequireRefreshTimestamp",
        id: 31
      },
      {
        rule: "optional",
        type: "double",
        name: "orderedShoppingListIdsTimestamp",
        id: 32
      },
      {
        rule: "repeated",
        type: "string",
        name: "shoppingListIds",
        id: 23
      },
      {
        rule: "optional",
        type: "double",
        name: "categorizedItemsTimestamp",
        id: 26
      },
      {
        rule: "optional",
        type: "double",
        name: "categorizedItemsRequireRefreshTimestamp",
        id: 27
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDStarred",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDSavedSearches",
        id: 4
      },
      {
        rule: "optional",
        type: "bytes",
        name: "DEPRECATEDList",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "DEPRECATEDWelcomed",
        id: 8
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDNotifyProducts",
        id: 9
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDNotifyTagNames",
        id: 10
      },
      {
        rule: "optional",
        type: "bytes",
        name: "DEPRECATEDLocation",
        id: 11
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDPreferredChainIds",
        id: 12
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDFavoriteTags",
        id: 13
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDHiddenTags",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "DEPRECATEDReferrer",
        id: 17
      },
      {
        rule: "optional",
        type: "string",
        name: "DEPRECATEDInviteCode",
        id: 18
      },
      {
        rule: "optional",
        type: "string",
        name: "DEPRECATEDHttpReferrer",
        id: 19
      },
      {
        rule: "optional",
        type: "int64",
        name: "DEPRECATEDWeeklyDealsEmailCount",
        id: 20
      },
      {
        rule: "repeated",
        type: "string",
        name: "DEPRECATEDPreferredStoreIds",
        id: 21
      },
      {
        rule: "optional",
        type: "double",
        name: "DEPRECATEDFavoriteProductsTimestamp",
        id: 22
      }
    ]
  },
  {
    name: "Tag",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "name",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "displayName",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "imageName",
        id: 8
      },
      {
        rule: "repeated",
        type: "string",
        name: "impliedTagNames",
        id: 6
      },
      {
        rule: "repeated",
        type: "string",
        name: "searchTerms",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "productIds",
        id: 2
      },
      {
        rule: "optional",
        type: "bytes",
        name: "priceStats",
        id: 4
      },
      {
        rule: "optional",
        type: "TagType",
        name: "tagType",
        id: 5
      }
    ],
    enums: [
      {
        name: "TagType",
        values: [
          {
            name: "TAG_TYPE_GENERIC",
            id: 0
          },
          {
            name: "TAG_TYPE_PRODUCT",
            id: 1
          },
          {
            name: "TAG_TYPE_CATEGORY",
            id: 2
          },
          {
            name: "TAG_TYPE_ATTRIBUTE",
            id: 3
          }
        ]
      }
    ]
  },
  {
    name: "PBDeletedUserInfo",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "double",
        name: "deletionTimestamp",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "userEmail",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "adminEmail",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "adminNote",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "supportTicketUrl",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "ipAddress",
        id: 8
      }
    ]
  },
  {
    name: "PBIcon",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "iconName",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "tintHexColor",
        id: 2
      }
    ]
  },
  {
    name: "PBUserListData",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "userIds",
        id: 3
      },
      {
        rule: "optional",
        type: "double",
        name: "userIdsTimestamp",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "listIds",
        id: 5
      },
      {
        rule: "optional",
        type: "double",
        name: "listIdsTimestamp",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "rootFolderId",
        id: 7
      },
      {
        rule: "optional",
        type: "double",
        name: "rootFolderIdTimestamp",
        id: 8
      },
      {
        rule: "optional",
        type: "double",
        name: "categorizedItemsTimestamp",
        id: 9
      },
      {
        rule: "optional",
        type: "double",
        name: "categorizedItemsRequireRefreshTimestamp",
        id: 10
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedListOrdering",
        id: 11
      }
    ]
  },
  {
    name: "ShoppingList",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "repeated",
        type: "ListItem",
        name: "items",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "creator",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "UNUSEDATTRIBUTE",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBEmailUserIDPair",
        name: "sharedUsers",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "password",
        id: 8
      },
      {
        rule: "repeated",
        type: "PBNotificationLocation",
        name: "notificationLocations",
        id: 9
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalClockTime",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "builtInAlexaListType",
        id: 11
      },
      {
        rule: "optional",
        type: "bool",
        name: "allowsMultipleListCategoryGroups",
        id: 16
      },
      {
        rule: "optional",
        type: "int32",
        name: "listItemSortOrder",
        id: 17
      },
      {
        rule: "optional",
        type: "int32",
        name: "newListItemPosition",
        id: 18
      }
    ],
    enums: [
      {
        name: "ListItemSortOrder",
        values: [
          {
            name: "Manual",
            id: 0
          },
          {
            name: "Alphabetical",
            id: 1
          }
        ]
      },
      {
        name: "NewListItemPosition",
        values: [
          {
            name: "Bottom",
            id: 0
          },
          {
            name: "Top",
            id: 1
          }
        ]
      }
    ]
  },
  {
    name: "PBItemQuantity",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "amount",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "unit",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "rawQuantity",
        id: 3
      }
    ]
  },
  {
    name: "PBItemPackageSize",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "size",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "unit",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "packageType",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "rawPackageSize",
        id: 4
      }
    ]
  },
  {
    name: "PBItemQuantityAndPackageSize",
    fields: [
      {
        rule: "optional",
        type: "PBItemQuantity",
        name: "quantityPb",
        id: 1
      },
      {
        rule: "optional",
        type: "PBItemPackageSize",
        name: "packageSizePb",
        id: 2
      }
    ]
  },
  {
    name: "PBItemIngredient",
    fields: [
      {
        rule: "optional",
        type: "PBIngredient",
        name: "ingredient",
        id: 1
      },
      {
        rule: "optional",
        type: "PBItemQuantity",
        name: "quantityPb",
        id: 6
      },
      {
        rule: "optional",
        type: "PBItemPackageSize",
        name: "packageSizePb",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "eventId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeName",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "eventDate",
        id: 5
      }
    ]
  },
  {
    name: "ListItem",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "serverModTime",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "details",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "checked",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeId",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "rawIngredient",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "priceMatchupTag",
        id: 9
      },
      {
        rule: "optional",
        type: "string",
        name: "priceId",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "category",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 12
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryMatchId",
        id: 13
      },
      {
        rule: "repeated",
        type: "string",
        name: "photoIds",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "eventId",
        id: 15
      },
      {
        rule: "repeated",
        type: "string",
        name: "storeIds",
        id: 16
      },
      {
        rule: "repeated",
        type: "PBItemPrice",
        name: "prices",
        id: 19
      },
      {
        rule: "repeated",
        type: "PBListItemCategoryAssignment",
        name: "categoryAssignments",
        id: 20
      },
      {
        rule: "optional",
        type: "PBItemQuantity",
        name: "quantityPb",
        id: 21
      },
      {
        rule: "optional",
        type: "PBItemQuantity",
        name: "priceQuantityPb",
        id: 22
      },
      {
        rule: "optional",
        type: "bool",
        name: "priceQuantityShouldOverrideItemQuantity",
        id: 23
      },
      {
        rule: "optional",
        type: "PBItemPackageSize",
        name: "packageSizePb",
        id: 24
      },
      {
        rule: "optional",
        type: "PBItemPackageSize",
        name: "pricePackageSizePb",
        id: 25
      },
      {
        rule: "optional",
        type: "bool",
        name: "pricePackageSizeShouldOverrideItemPackageSize",
        id: 26
      },
      {
        rule: "repeated",
        type: "PBItemIngredient",
        name: "ingredients",
        id: 27
      },
      {
        rule: "optional",
        type: "bool",
        name: "itemQuantityShouldOverrideIngredientQuantity",
        id: 28
      },
      {
        rule: "optional",
        type: "bool",
        name: "itemPackageSizeShouldOverrideIngredientPackageSize",
        id: 29
      },
      {
        rule: "optional",
        type: "string",
        name: "productUpc",
        id: 30
      },
      {
        rule: "optional",
        type: "int32",
        name: "manualSortIndex",
        id: 17
      },
      {
        rule: "optional",
        type: "string",
        name: "deprecatedQuantity",
        id: 18
      }
    ]
  },
  {
    name: "PBItemPrice",
    fields: [
      {
        rule: "optional",
        type: "double",
        name: "amount",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "details",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "storeId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "date",
        id: 5
      }
    ]
  },
  {
    name: "PBListFolderItem",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "int32",
        name: "itemType",
        id: 2
      }
    ],
    enums: [
      {
        name: "ItemType",
        values: [
          {
            name: "ListType",
            id: 0
          },
          {
            name: "FolderType",
            id: 1
          }
        ]
      }
    ]
  },
  {
    name: "PBListFolderSettings",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "listsSortOrder",
        id: 1
      },
      {
        rule: "optional",
        type: "int32",
        name: "folderSortPosition",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "folderHexColor",
        id: 3
      },
      {
        rule: "optional",
        type: "PBIcon",
        name: "icon",
        id: 4
      }
    ],
    enums: [
      {
        name: "SortOrder",
        values: [
          {
            name: "ManualSortOrder",
            id: 0
          },
          {
            name: "AlphabeticalSortOrder",
            id: 1
          }
        ]
      },
      {
        name: "FolderSortPosition",
        values: [
          {
            name: "FolderSortPositionAfterLists",
            id: 0
          },
          {
            name: "FolderSortPositionBeforeLists",
            id: 1
          },
          {
            name: "FolderSortPositionWithLists",
            id: 2
          }
        ]
      }
    ]
  },
  {
    name: "PBListFolder",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBListFolderItem",
        name: "items",
        id: 4
      },
      {
        rule: "optional",
        type: "PBListFolderSettings",
        name: "folderSettings",
        id: 5
      }
    ]
  },
  {
    name: "PBShoppingListArchive",
    fields: [
      {
        rule: "optional",
        type: "ShoppingList",
        name: "shoppingList",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListSettings",
        name: "listSettings",
        id: 2
      },
      {
        rule: "repeated",
        type: "PBListCategoryGroup",
        name: "listCategoryGroups",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBStore",
        name: "stores",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBStoreFilter",
        name: "storeFilters",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBListCategorizationRule",
        name: "categorizationRules",
        id: 6
      },
      {
        rule: "optional",
        type: "StarterList",
        name: "favoriteItems",
        id: 7
      },
      {
        rule: "optional",
        type: "StarterList",
        name: "recentItems",
        id: 8
      }
    ]
  },
  {
    name: "PBListFolderItemArchive",
    fields: [
      {
        rule: "optional",
        type: "PBShoppingListArchive",
        name: "listArchive",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListFolderArchive",
        name: "folderArchive",
        id: 2
      }
    ]
  },
  {
    name: "PBListFolderArchive",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListFolderSettings",
        name: "folderSettings",
        id: 2
      },
      {
        rule: "repeated",
        type: "PBListFolderItemArchive",
        name: "items",
        id: 3
      }
    ]
  },
  {
    name: "PBListFoldersResponse",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "listDataId",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "rootFolderId",
        id: 2
      },
      {
        rule: "optional",
        type: "bool",
        name: "includesAllFolders",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBListFolder",
        name: "listFolders",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedFolderIds",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedListOrdering",
        id: 6
      }
    ]
  },
  {
    name: "PBListFolderTimestamps",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "rootFolderId",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBTimestamp",
        name: "folderTimestamps",
        id: 2
      }
    ]
  },
  {
    name: "PBListCategoryGroupResponse",
    fields: [
      {
        rule: "optional",
        type: "PBListCategoryGroup",
        name: "categoryGroup",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedCategoryIds",
        id: 2
      }
    ]
  },
  {
    name: "ShoppingListsResponse",
    fields: [
      {
        rule: "repeated",
        type: "ShoppingList",
        name: "newLists",
        id: 1
      },
      {
        rule: "repeated",
        type: "ShoppingList",
        name: "modifiedLists",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "unmodifiedIds",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "unknownIds",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "orderedIds",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBListResponse",
        name: "listResponses",
        id: 6
      }
    ]
  },
  {
    name: "PBListResponse",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "isFullSync",
        id: 2
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBListCategoryGroupResponse",
        name: "categoryGroupResponses",
        id: 7
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedCategoryGroupIds",
        id: 8
      },
      {
        rule: "repeated",
        type: "PBListCategorizationRule",
        name: "categorizationRules",
        id: 13
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedCategorizationRuleIds",
        id: 14
      },
      {
        rule: "repeated",
        type: "PBStore",
        name: "stores",
        id: 9
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedStoreIds",
        id: 10
      },
      {
        rule: "repeated",
        type: "PBStoreFilter",
        name: "storeFilters",
        id: 11
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedStoreFilterIds",
        id: 12
      }
    ]
  },
  {
    name: "StarterList",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "repeated",
        type: "ListItem",
        name: "items",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 6
      },
      {
        rule: "optional",
        type: "int32",
        name: "starterListType",
        id: 7
      }
    ],
    enums: [
      {
        name: "Type",
        values: [
          {
            name: "UserType",
            id: 0
          },
          {
            name: "RecentItemsType",
            id: 1
          },
          {
            name: "FavoriteItemsType",
            id: 2
          }
        ]
      }
    ]
  },
  {
    name: "StarterListResponse",
    fields: [
      {
        rule: "optional",
        type: "StarterList",
        name: "starterList",
        id: 1
      }
    ]
  },
  {
    name: "StarterListBatchResponse",
    fields: [
      {
        rule: "repeated",
        type: "StarterListResponse",
        name: "listResponses",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "includesAllLists",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "unknownListIds",
        id: 3
      }
    ]
  },
  {
    name: "StarterListsResponseV2",
    fields: [
      {
        rule: "optional",
        type: "StarterListBatchResponse",
        name: "userListsResponse",
        id: 1
      },
      {
        rule: "optional",
        type: "StarterListBatchResponse",
        name: "recentItemListsResponse",
        id: 2
      },
      {
        rule: "optional",
        type: "StarterListBatchResponse",
        name: "favoriteItemListsResponse",
        id: 3
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedUserFavorites",
        id: 4
      }
    ]
  },
  {
    name: "StarterListsResponse",
    fields: [
      {
        rule: "repeated",
        type: "StarterList",
        name: "newLists",
        id: 1
      },
      {
        rule: "repeated",
        type: "StarterList",
        name: "modifiedLists",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "unmodifiedIds",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "unknownIds",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "orderedIds",
        id: 5
      }
    ]
  },
  {
    name: "PBStore",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "optional",
        type: "int32",
        name: "sortIndex",
        id: 5
      }
    ]
  },
  {
    name: "PBStoreFilter",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "storeIds",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "includesUnassignedItems",
        id: 6
      },
      {
        rule: "optional",
        type: "int32",
        name: "sortIndex",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "listCategoryGroupId",
        id: 8
      },
      {
        rule: "optional",
        type: "bool",
        name: "showsAllItems",
        id: 9
      }
    ]
  },
  {
    name: "PBListCategory",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryGroupId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "icon",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "systemCategory",
        id: 7
      },
      {
        rule: "optional",
        type: "int32",
        name: "sortIndex",
        id: 9
      }
    ]
  },
  {
    name: "PBListCategoryGroup",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBListCategory",
        name: "categories",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "defaultCategoryId",
        id: 8
      },
      {
        rule: "optional",
        type: "uint64",
        name: "categoriesLogicalTimestamp",
        id: 6
      },
      {
        rule: "optional",
        type: "uint64",
        name: "deletedCategoriesLogicalTimestamp",
        id: 7
      }
    ]
  },
  {
    name: "PBListCategorizationRule",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryGroupId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "itemName",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryId",
        id: 6
      }
    ]
  },
  {
    name: "PBListCategorizationRuleList",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBListCategorizationRule",
        name: "categorizationRules",
        id: 4
      },
      {
        rule: "optional",
        type: "uint64",
        name: "categorizationRulesLogicalTimestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "uint64",
        name: "deletedCategorizationRulesLogicalTimestamp",
        id: 6
      }
    ]
  },
  {
    name: "PBListItemCategoryAssignment",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryGroupId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryId",
        id: 3
      }
    ]
  },
  {
    name: "PBRecipe",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "icon",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "note",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "sourceName",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "sourceUrl",
        id: 7
      },
      {
        rule: "repeated",
        type: "PBIngredient",
        name: "ingredients",
        id: 8
      },
      {
        rule: "repeated",
        type: "string",
        name: "preparationSteps",
        id: 9
      },
      {
        rule: "repeated",
        type: "string",
        name: "photoIds",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "adCampaignId",
        id: 12
      },
      {
        rule: "repeated",
        type: "string",
        name: "photoUrls",
        id: 13
      },
      {
        rule: "optional",
        type: "double",
        name: "scaleFactor",
        id: 14
      },
      {
        rule: "optional",
        type: "int32",
        name: "rating",
        id: 15
      },
      {
        rule: "optional",
        type: "double",
        name: "creationTimestamp",
        id: 16
      },
      {
        rule: "optional",
        type: "string",
        name: "nutritionalInfo",
        id: 17
      },
      {
        rule: "optional",
        type: "int32",
        name: "cookTime",
        id: 18
      },
      {
        rule: "optional",
        type: "int32",
        name: "prepTime",
        id: 19
      },
      {
        rule: "optional",
        type: "string",
        name: "servings",
        id: 20
      },
      {
        rule: "optional",
        type: "string",
        name: "paprikaIdentifier",
        id: 21
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeDataId",
        id: 23
      }
    ]
  },
  {
    name: "PBRecipeCookingState",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "recipeId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "eventId",
        id: 3
      },
      {
        rule: "optional",
        type: "double",
        name: "lastOpenedTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "int32",
        name: "selectedTabId",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "checkedIngredientIds",
        id: 6
      },
      {
        rule: "optional",
        type: "int32",
        name: "selectedStepNumber",
        id: 7
      }
    ]
  },
  {
    name: "PBXRecipe",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "icon",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "note",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "sourceName",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "sourceUrl",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBXIngredient",
        name: "ingredients",
        id: 7
      },
      {
        rule: "repeated",
        type: "string",
        name: "preparationSteps",
        id: 8
      },
      {
        rule: "optional",
        type: "bytes",
        name: "photoBytes",
        id: 9
      },
      {
        rule: "optional",
        type: "double",
        name: "scaleFactor",
        id: 10
      },
      {
        rule: "optional",
        type: "int32",
        name: "rating",
        id: 11
      },
      {
        rule: "optional",
        type: "double",
        name: "creationTimestamp",
        id: 12
      },
      {
        rule: "optional",
        type: "string",
        name: "nutritionalInfo",
        id: 13
      },
      {
        rule: "optional",
        type: "int32",
        name: "cookTime",
        id: 14
      },
      {
        rule: "optional",
        type: "int32",
        name: "prepTime",
        id: 15
      },
      {
        rule: "optional",
        type: "string",
        name: "servings",
        id: 16
      }
    ]
  },
  {
    name: "PBXRecipeArchive",
    fields: [
      {
        rule: "repeated",
        type: "PBXRecipe",
        name: "recipes",
        id: 1
      }
    ]
  },
  {
    name: "PBIngredient",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "rawIngredient",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "quantity",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "note",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "isHeading",
        id: 7
      }
    ]
  },
  {
    name: "PBXIngredient",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "rawIngredient",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "quantity",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "note",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "isHeading",
        id: 5
      }
    ]
  },
  {
    name: "PBRecipeCollectionSettings",
    fields: [
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "int32",
        name: "recipesSortOrder",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "useReversedSortDirection",
        id: 4
      },
      {
        rule: "optional",
        type: "int32",
        name: "collectionsSortOrder",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "useReversedCollectionsSortDirection",
        id: 7
      },
      {
        rule: "optional",
        type: "PBSmartFilter",
        name: "smartFilter",
        id: 3
      },
      {
        rule: "optional",
        type: "PBIcon",
        name: "icon",
        id: 8
      },
      {
        rule: "optional",
        type: "bool",
        name: "showOnlyRecipesWithNoCollection",
        id: 2
      }
    ],
    enums: [
      {
        name: "SortOrder",
        values: [
          {
            name: "ManualSortOrder",
            id: 0
          },
          {
            name: "AlphabeticalSortOrder",
            id: 1
          },
          {
            name: "RatingSortOrder",
            id: 2
          },
          {
            name: "DateCreatedSortOrder",
            id: 3
          },
          {
            name: "PrepTimeSortOrder",
            id: 4
          },
          {
            name: "CookTimeSortOrder",
            id: 5
          },
          {
            name: "RecipeCountSortOrder",
            id: 6
          }
        ]
      }
    ]
  },
  {
    name: "PBRecipeCollection",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeIds",
        id: 4
      },
      {
        rule: "optional",
        type: "PBRecipeCollectionSettings",
        name: "collectionSettings",
        id: 5
      }
    ]
  },
  {
    name: "PBUserRecipeData",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "double",
        name: "recipeCollectionsTimestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "double",
        name: "recipeCollectionIdsTimestamp",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "allRecipesId",
        id: 7
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeCollectionIds",
        id: 8
      },
      {
        rule: "repeated",
        type: "string",
        name: "userIds",
        id: 9
      },
      {
        rule: "optional",
        type: "double",
        name: "userIdsTimestamp",
        id: 10
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasImportedPunchforkRecipes",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "mealPlanningCalendarId",
        id: 12
      },
      {
        rule: "map",
        type: "PBRecipeCollectionSettings",
        keytype: "string",
        name: "settingsMapForSystemCollections",
        id: 14
      },
      {
        rule: "optional",
        type: "double",
        name: "settingsMapForSystemCollectionsTimestamp",
        id: 15
      },
      {
        rule: "optional",
        type: "int32",
        name: "maxRecipeCount",
        id: 13
      },
      {
        rule: "optional",
        type: "double",
        name: "allRecipesTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "double",
        name: "recipesTimestamp",
        id: 3
      }
    ]
  },
  {
    name: "PBRecipeLinkRequest",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "requestingUserId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "requestingEmail",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "requestingName",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "confirmingUserId",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "confirmingEmail",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "confirmingName",
        id: 7
      }
    ]
  },
  {
    name: "PBRecipeLinkRequestResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "PBRecipeDataResponse",
        name: "recipeDataResponse",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "errorTitle",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "errorMessage",
        id: 4
      }
    ]
  },
  {
    name: "PBRecipeDataResponse",
    fields: [
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 1
      },
      {
        rule: "optional",
        type: "PBRecipeCollection",
        name: "allRecipesCollection",
        id: 2
      },
      {
        rule: "repeated",
        type: "PBRecipe",
        name: "recipes",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeCollectionIds",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBRecipeCollection",
        name: "recipeCollections",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBRecipeLinkRequest",
        name: "pendingRecipeLinkRequests",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBRecipeLinkRequest",
        name: "recipeLinkRequestsToConfirm",
        id: 7
      },
      {
        rule: "repeated",
        type: "PBEmailUserIDPair",
        name: "linkedUsers",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeDataId",
        id: 9
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasImportedPunchforkRecipes",
        id: 10
      },
      {
        rule: "optional",
        type: "bool",
        name: "includesRecipeCollectionIds",
        id: 11
      },
      {
        rule: "optional",
        type: "int32",
        name: "maxRecipeCount",
        id: 12
      },
      {
        rule: "map",
        type: "PBRecipeCollectionSettings",
        keytype: "string",
        name: "settingsMapForSystemCollections",
        id: 13
      }
    ]
  },
  {
    name: "PBRecipeOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeDataId",
        id: 2
      },
      {
        rule: "optional",
        type: "PBRecipe",
        name: "recipe",
        id: 3
      },
      {
        rule: "optional",
        type: "PBRecipeCollection",
        name: "recipeCollection",
        id: 4
      },
      {
        rule: "optional",
        type: "PBRecipeLinkRequest",
        name: "recipeLinkRequest",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeCollectionIds",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBRecipe",
        name: "recipes",
        id: 7
      },
      {
        rule: "optional",
        type: "bool",
        name: "isNewRecipeFromWebImport",
        id: 8
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeIds",
        id: 9
      },
      {
        rule: "repeated",
        type: "string",
        name: "recipeEventIds",
        id: 10
      },
      {
        rule: "optional",
        type: "int32",
        name: "maxRecipeCount",
        id: 11
      }
    ]
  },
  {
    name: "PBRecipeOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBRecipeOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBRecipeList",
    fields: [
      {
        rule: "repeated",
        type: "PBRecipe",
        name: "recipes",
        id: 1
      }
    ]
  },
  {
    name: "PBRecipeDataArchive",
    fields: [
      {
        rule: "repeated",
        type: "PBRecipe",
        name: "recipes",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBRecipeCollection",
        name: "recipeCollections",
        id: 2
      }
    ]
  },
  {
    name: "PBRecipeWebImportResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "PBRecipe",
        name: "recipe",
        id: 2
      },
      {
        rule: "optional",
        type: "bool",
        name: "isPremiumUser",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "siteSpecificHelpText",
        id: 4
      },
      {
        rule: "optional",
        type: "int32",
        name: "freeRecipeImportsRemainingCount",
        id: 5
      }
    ]
  },
  {
    name: "PBCalendar",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalClockTime",
        id: 2
      }
    ]
  },
  {
    name: "PBCalendarEvent",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "calendarId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "date",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "title",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "details",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeId",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "labelId",
        id: 8
      },
      {
        rule: "optional",
        type: "int32",
        name: "orderAddedSortIndex",
        id: 9
      },
      {
        rule: "optional",
        type: "int32",
        name: "labelSortIndex",
        id: 11
      },
      {
        rule: "optional",
        type: "double",
        name: "recipeScaleFactor",
        id: 10
      }
    ]
  },
  {
    name: "PBCalendarLabel",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "calendarId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "hexColor",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 5
      },
      {
        rule: "optional",
        type: "int32",
        name: "sortIndex",
        id: 6
      }
    ]
  },
  {
    name: "PBCalendarResponse",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "calendarId",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "isFullSync",
        id: 2
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBCalendarEvent",
        name: "events",
        id: 4
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedEventIds",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBCalendarLabel",
        name: "labels",
        id: 6
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedLabelIds",
        id: 7
      }
    ]
  },
  {
    name: "PBCalendarOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "calendarId",
        id: 2
      },
      {
        rule: "optional",
        type: "PBCalendarEvent",
        name: "updatedEvent",
        id: 3
      },
      {
        rule: "optional",
        type: "PBCalendarEvent",
        name: "originalEvent",
        id: 4
      },
      {
        rule: "optional",
        type: "PBCalendarLabel",
        name: "updatedLabel",
        id: 5
      },
      {
        rule: "optional",
        type: "PBCalendarLabel",
        name: "originalLabel",
        id: 6
      },
      {
        rule: "repeated",
        type: "string",
        name: "sortedLabelIds",
        id: 7
      },
      {
        rule: "repeated",
        type: "string",
        name: "eventIds",
        id: 8
      },
      {
        rule: "repeated",
        type: "PBCalendarEvent",
        name: "updatedEvents",
        id: 9
      },
      {
        rule: "repeated",
        type: "PBCalendarEvent",
        name: "originalEvents",
        id: 10
      }
    ]
  },
  {
    name: "PBCalendarOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBCalendarOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBMealPlanSetICalendarEnabledRequest",
    fields: [
      {
        rule: "optional",
        type: "bool",
        name: "shouldEnableIcalendarGeneration",
        id: 1
      }
    ]
  },
  {
    name: "PBMealPlanSetICalendarEnabledRequestResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "PBAccountInfoResponse",
        name: "accountInfo",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "errorTitle",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "errorMessage",
        id: 4
      }
    ]
  },
  {
    name: "PBSmartCondition",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "fieldID",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "operatorID",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "value",
        id: 3
      }
    ]
  },
  {
    name: "PBSmartFilter",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "optional",
        type: "bool",
        name: "requiresMatchingAllConditions",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBSmartCondition",
        name: "conditions",
        id: 5
      }
    ]
  },
  {
    name: "PBOperationMetadata",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "operationId",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "handlerId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 3
      },
      {
        rule: "optional",
        type: "int32",
        name: "operationClass",
        id: 4
      }
    ],
    enums: [
      {
        name: "OperationClass",
        values: [
          {
            name: "UndefinedOperation",
            id: 0
          },
          {
            name: "StoreOperation",
            id: 1
          },
          {
            name: "StoreFilterOperation",
            id: 2
          },
          {
            name: "ListCategoryOperation",
            id: 3
          },
          {
            name: "ListCategoryGroupOperation",
            id: 4
          },
          {
            name: "ListCategorizationRuleOperation",
            id: 5
          }
        ]
      }
    ]
  },
  {
    name: "PBFavoriteProductOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "productId",
        id: 2
      }
    ]
  },
  {
    name: "PBFavoriteProductOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBFavoriteProductOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBSavedRecipeOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "recipeId",
        id: 2
      }
    ]
  },
  {
    name: "PBSavedRecipeOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBSavedRecipeOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBOrderedShoppingListIDsOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "orderedListIds",
        id: 2
      }
    ]
  },
  {
    name: "PBOrderedShoppingListIDsOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBOrderedShoppingListIDsOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBOrderedStarterListIDsOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "orderedListIds",
        id: 2
      }
    ]
  },
  {
    name: "PBOrderedStarterListIDsOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBOrderedStarterListIDsOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBListOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listItemId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "updatedValue",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "originalValue",
        id: 5
      },
      {
        rule: "optional",
        type: "ListItem",
        name: "listItem",
        id: 6
      },
      {
        rule: "optional",
        type: "ShoppingList",
        name: "list",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "listFolderId",
        id: 8
      },
      {
        rule: "optional",
        type: "PBNotificationLocation",
        name: "notificationLocation",
        id: 9
      },
      {
        rule: "optional",
        type: "PBStore",
        name: "updatedStore",
        id: 10
      },
      {
        rule: "optional",
        type: "PBStore",
        name: "originalStore",
        id: 11
      },
      {
        rule: "repeated",
        type: "string",
        name: "sortedStoreIds",
        id: 12
      },
      {
        rule: "optional",
        type: "PBStoreFilter",
        name: "updatedStoreFilter",
        id: 13
      },
      {
        rule: "optional",
        type: "PBStoreFilter",
        name: "originalStoreFilter",
        id: 14
      },
      {
        rule: "repeated",
        type: "string",
        name: "sortedStoreFilterIds",
        id: 15
      },
      {
        rule: "optional",
        type: "PBItemPrice",
        name: "itemPrice",
        id: 16
      },
      {
        rule: "optional",
        type: "PBListCategory",
        name: "updatedCategory",
        id: 17
      },
      {
        rule: "optional",
        type: "PBListCategory",
        name: "originalCategory",
        id: 18
      },
      {
        rule: "optional",
        type: "PBListCategoryGroup",
        name: "updatedCategoryGroup",
        id: 19
      },
      {
        rule: "optional",
        type: "PBListCategoryGroup",
        name: "originalCategoryGroup",
        id: 20
      },
      {
        rule: "optional",
        type: "PBListCategorizationRule",
        name: "updatedCategorizationRule",
        id: 21
      },
      {
        rule: "optional",
        type: "PBListCategorizationRule",
        name: "originalCategorizationRule",
        id: 22
      },
      {
        rule: "repeated",
        type: "PBListCategorizationRule",
        name: "updatedCategorizationRules",
        id: 23
      }
    ]
  },
  {
    name: "PBListOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBListOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBShareListOperationResponse",
    fields: [
      {
        rule: "optional",
        type: "PBEmailUserIDPair",
        name: "sharedUser",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "originalListTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "double",
        name: "updatedListTimestamp",
        id: 3
      },
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "errorTitle",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "errorMessage",
        id: 6
      }
    ]
  },
  {
    name: "PBListFolderOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "listDataId",
        id: 2
      },
      {
        rule: "optional",
        type: "PBListFolder",
        name: "listFolder",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBListFolderItem",
        name: "folderItems",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "originalParentFolderId",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "updatedParentFolderId",
        id: 6
      }
    ]
  },
  {
    name: "PBListFolderOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBListFolderOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBStarterListOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listItemId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "updatedValue",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "originalValue",
        id: 5
      },
      {
        rule: "optional",
        type: "ListItem",
        name: "listItem",
        id: 6
      },
      {
        rule: "optional",
        type: "StarterList",
        name: "list",
        id: 7
      },
      {
        rule: "optional",
        type: "PBItemPrice",
        name: "itemPrice",
        id: 8
      }
    ]
  },
  {
    name: "PBStarterListOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBStarterListOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBCategorizeItemOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "ListItem",
        name: "listItem",
        id: 2
      }
    ]
  },
  {
    name: "PBCategorizeItemOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBCategorizeItemOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBCategorizedItemsList",
    fields: [
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "timestamp",
        id: 1
      },
      {
        rule: "repeated",
        type: "ListItem",
        name: "categorizedItems",
        id: 2
      }
    ]
  },
  {
    name: "PBCategoryOrdering",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "categories",
        id: 3
      }
    ]
  },
  {
    name: "PBListSettings",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listId",
        id: 3
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHideCategories",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "genericGroceryAutocompleteEnabled",
        id: 8
      },
      {
        rule: "optional",
        type: "bool",
        name: "favoritesAutocompleteEnabled",
        id: 12
      },
      {
        rule: "optional",
        type: "bool",
        name: "recentItemsAutocompleteEnabled",
        id: 13
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHideCompletedItems",
        id: 14
      },
      {
        rule: "optional",
        type: "int32",
        name: "listColorType",
        id: 15
      },
      {
        rule: "optional",
        type: "string",
        name: "listThemeId",
        id: 16
      },
      {
        rule: "optional",
        type: "PBListTheme",
        name: "customTheme",
        id: 17
      },
      {
        rule: "optional",
        type: "PBListTheme",
        name: "customDarkTheme",
        id: 31
      },
      {
        rule: "optional",
        type: "PBIcon",
        name: "icon",
        id: 32
      },
      {
        rule: "optional",
        type: "string",
        name: "badgeMode",
        id: 18
      },
      {
        rule: "optional",
        type: "bool",
        name: "locationNotificationsEnabled",
        id: 19
      },
      {
        rule: "optional",
        type: "string",
        name: "storeFilterId",
        id: 20
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHideStoreNames",
        id: 21
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHideRunningTotals",
        id: 22
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHidePrices",
        id: 23
      },
      {
        rule: "optional",
        type: "int32",
        name: "leftRunningTotalType",
        id: 24
      },
      {
        rule: "optional",
        type: "int32",
        name: "rightRunningTotalType",
        id: 25
      },
      {
        rule: "optional",
        type: "string",
        name: "listCategoryGroupId",
        id: 27
      },
      {
        rule: "optional",
        type: "string",
        name: "migrationListCategoryGroupIdForNewList",
        id: 28
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldShowSharedListCategoryOrderHintBanner",
        id: 29
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasShownAccountNamePrompt",
        id: 33
      },
      {
        rule: "optional",
        type: "bool",
        name: "isEnabledForAlexa",
        id: 34
      },
      {
        rule: "optional",
        type: "string",
        name: "linkedAlexaListId",
        id: 26
      },
      {
        rule: "optional",
        type: "string",
        name: "linkedGoogleAssistantListId",
        id: 30
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldRememberItemCategories",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryGroupingId",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "listItemSortOrder",
        id: 9
      },
      {
        rule: "optional",
        type: "string",
        name: "selectedCategoryOrdering",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBCategoryOrdering",
        name: "categoryOrderings",
        id: 7
      }
    ]
  },
  {
    name: "PBListSettingsList",
    fields: [
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "timestamp",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBListSettings",
        name: "settings",
        id: 2
      }
    ]
  },
  {
    name: "PBListSettingsOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListSettings",
        name: "updatedSettings",
        id: 2
      }
    ]
  },
  {
    name: "PBListSettingsOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBListSettingsOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBListTheme",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "fontName",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "bannerHexColor",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "backgroundHexColor",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "backgroundTexture",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "itemNameHexColor",
        id: 9
      },
      {
        rule: "optional",
        type: "string",
        name: "itemDetailsHexColor",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "controlHexColor",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "separatorHexColor",
        id: 12
      },
      {
        rule: "optional",
        type: "string",
        name: "navigationBarHexColor",
        id: 13
      },
      {
        rule: "optional",
        type: "string",
        name: "cellHexColor",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "cellTexture",
        id: 15
      },
      {
        rule: "optional",
        type: "string",
        name: "tableHexColor",
        id: 16
      },
      {
        rule: "optional",
        type: "string",
        name: "tableTexture",
        id: 17
      },
      {
        rule: "optional",
        type: "string",
        name: "backgroundImage",
        id: 18
      },
      {
        rule: "optional",
        type: "string",
        name: "selectionHexColor",
        id: 19
      }
    ]
  },
  {
    name: "PBListThemeList",
    fields: [
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "timestamp",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBListTheme",
        name: "themes",
        id: 2
      }
    ]
  },
  {
    name: "PBMobileAppSettings",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "defaultListId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "crossOffGesture",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "listsSortOrder",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "starterListsSortOrder",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "remindersAppImportEnabled",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "appBadgeMode",
        id: 8
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldAutoImportReminders",
        id: 9
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldPreventScreenAutolock",
        id: 10
      },
      {
        rule: "optional",
        type: "int32",
        name: "keepScreenOnBehavior",
        id: 44
      },
      {
        rule: "optional",
        type: "bool",
        name: "promptToLoadPhotosOverCellularData",
        id: 11
      },
      {
        rule: "optional",
        type: "string",
        name: "listIdForRecipeIngredients",
        id: 12
      },
      {
        rule: "optional",
        type: "string",
        name: "webSelectedListId",
        id: 43
      },
      {
        rule: "optional",
        type: "string",
        name: "webSelectedRecipeId",
        id: 13
      },
      {
        rule: "optional",
        type: "string",
        name: "webSelectedRecipeCollectionId",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "webSelectedTabId",
        id: 15
      },
      {
        rule: "optional",
        type: "string",
        name: "webSelectedListFolderPath",
        id: 16
      },
      {
        rule: "optional",
        type: "int32",
        name: "webSelectedMealPlanTab",
        id: 17
      },
      {
        rule: "optional",
        type: "bool",
        name: "webHasHiddenStoresAndFiltersHelp",
        id: 18
      },
      {
        rule: "optional",
        type: "bool",
        name: "webHasHiddenItemPricesHelp",
        id: 22
      },
      {
        rule: "optional",
        type: "string",
        name: "webDecimalSeparator",
        id: 23
      },
      {
        rule: "optional",
        type: "string",
        name: "webCurrencyCode",
        id: 24
      },
      {
        rule: "optional",
        type: "string",
        name: "webCurrencySymbol",
        id: 25
      },
      {
        rule: "optional",
        type: "int32",
        name: "webSelectedRecipeCollectionType",
        id: 40
      },
      {
        rule: "repeated",
        type: "PBHintBannerDisplayStats",
        name: "hintBannerDisplayStats",
        id: 19
      },
      {
        rule: "optional",
        type: "PBRecipeCollectionSettings",
        name: "webSelectedRecipeCollectionSettingsOverride",
        id: 20
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldUseMetricUnits",
        id: 21
      },
      {
        rule: "optional",
        type: "bool",
        name: "isAccountLinkedToAlexaSkill",
        id: 29
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaApiEndpoint",
        id: 30
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldExcludeNewListsFromAlexaByDefault",
        id: 38
      },
      {
        rule: "optional",
        type: "string",
        name: "defaultListIdForAlexa",
        id: 45
      },
      {
        rule: "optional",
        type: "bool",
        name: "clientHasShownAlexaOnboarding",
        id: 46
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedUserCategoriesToListCategories",
        id: 32
      },
      {
        rule: "repeated",
        type: "PBRecipeCookingState",
        name: "recipeCookingStates",
        id: 37
      },
      {
        rule: "optional",
        type: "bool",
        name: "didSuppressAccountNamePrompt",
        id: 41
      },
      {
        rule: "optional",
        type: "bool",
        name: "isOnlineShoppingDisabled",
        id: 42
      },
      {
        rule: "repeated",
        type: "PBAlexaList",
        name: "unlinkedAlexaLists",
        id: 26
      },
      {
        rule: "optional",
        type: "bool",
        name: "alexaSkillHasListReadPermission",
        id: 27
      },
      {
        rule: "optional",
        type: "bool",
        name: "alexaSkillHasListWritePermission",
        id: 28
      },
      {
        rule: "optional",
        type: "bool",
        name: "alexaSkillOnlySupportsBuiltInLists",
        id: 31
      },
      {
        rule: "optional",
        type: "bool",
        name: "isAccountLinkedToGoogleAssistant",
        id: 34
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldNotLinkNewListsWithGoogleAssistantByDefault",
        id: 39
      },
      {
        rule: "optional",
        type: "bool",
        name: "clientHasShownGoogleAssistantOnboarding",
        id: 36
      },
      {
        rule: "repeated",
        type: "PBGoogleAssistantList",
        name: "unlinkedGoogleAssistantLists",
        id: 33
      },
      {
        rule: "optional",
        type: "bool",
        name: "isActiveGoogleAssistantProvider",
        id: 35
      }
    ],
    enums: [
      {
        name: "KeepScreenOnBehavior",
        values: [
          {
            name: "Never",
            id: 0
          },
          {
            name: "Always",
            id: 1
          },
          {
            name: "WhileCooking",
            id: 2
          }
        ]
      }
    ]
  },
  {
    name: "PBAppNotice",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "title",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "notificationTitle",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "notificationSubtitle",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "bodyHtml",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "bodyCss",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "context",
        id: 9
      },
      {
        rule: "optional",
        type: "bool",
        name: "isDraft",
        id: 10
      },
      {
        rule: "optional",
        type: "double",
        name: "maxUserCreationTime",
        id: 11
      }
    ]
  },
  {
    name: "PBAppNoticesUserData",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "readNoticeIds",
        id: 3
      },
      {
        rule: "repeated",
        type: "string",
        name: "dismissedGlobalNoticeIds",
        id: 4
      }
    ]
  },
  {
    name: "PBAppNoticeOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "noticeIds",
        id: 2
      }
    ]
  },
  {
    name: "PBAppNoticeOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBAppNoticeOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBAppNoticeList",
    fields: [
      {
        rule: "repeated",
        type: "PBAppNotice",
        name: "notices",
        id: 1
      }
    ]
  },
  {
    name: "PBHintBannerDisplayStats",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "repeated",
        type: "double",
        name: "displayTimestamps",
        id: 2
      }
    ]
  },
  {
    name: "PBMobileAppSettingsOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "PBMobileAppSettings",
        name: "updatedSettings",
        id: 2
      }
    ]
  },
  {
    name: "PBMobileAppSettingsOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBMobileAppSettingsOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBUserCategory",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "icon",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "systemCategory",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "categoryMatchId",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "fromSharedList",
        id: 7
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 8
      }
    ]
  },
  {
    name: "PBCategoryGrouping",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 3
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "sharingId",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "categoryIds",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldHideFromBrowseListCategoryGroupsScreen",
        id: 7
      }
    ]
  },
  {
    name: "PBUserCategoryData",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "double",
        name: "requiresRefreshTimestamp",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBUserCategory",
        name: "categories",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBCategoryGrouping",
        name: "groupings",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasMigratedCategoryOrderings",
        id: 6
      }
    ]
  },
  {
    name: "PBUserCategoryOperation",
    fields: [
      {
        rule: "optional",
        type: "PBOperationMetadata",
        name: "metadata",
        id: 1
      },
      {
        rule: "optional",
        type: "PBUserCategory",
        name: "category",
        id: 2
      },
      {
        rule: "optional",
        type: "PBCategoryGrouping",
        name: "grouping",
        id: 3
      }
    ]
  },
  {
    name: "PBUserCategoryOperationList",
    fields: [
      {
        rule: "repeated",
        type: "PBUserCategoryOperation",
        name: "operations",
        id: 1
      }
    ]
  },
  {
    name: "PBTimestamp",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 2
      }
    ]
  },
  {
    name: "PBTimestampList",
    fields: [
      {
        rule: "repeated",
        type: "PBTimestamp",
        name: "timestamps",
        id: 1
      }
    ]
  },
  {
    name: "PBLogicalTimestamp",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "description",
        id: 3
      }
    ]
  },
  {
    name: "PBLogicalTimestampList",
    fields: [
      {
        rule: "repeated",
        type: "PBLogicalTimestamp",
        name: "timestamps",
        id: 1
      }
    ]
  },
  {
    name: "PBEditOperationResponse",
    fields: [
      {
        rule: "repeated",
        type: "PBTimestamp",
        name: "originalTimestamps",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBTimestamp",
        name: "newTimestamps",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "processedOperations",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBLogicalTimestamp",
        name: "originalLogicalTimestamps",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBLogicalTimestamp",
        name: "currentLogicalTimestamps",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "fullRefreshTimestampIds",
        id: 6
      }
    ]
  },
  {
    name: "PBUserSubscriptionInfo",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsActive",
        id: 16
      },
      {
        rule: "optional",
        type: "int32",
        name: "subscriptionManagementSystem",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "expirationTimestampMsStr",
        id: 2
      },
      {
        rule: "optional",
        type: "int64",
        name: "expirationTimestampMs",
        id: 15
      },
      {
        rule: "optional",
        type: "int32",
        name: "subscriptionType",
        id: 3
      },
      {
        rule: "optional",
        type: "PBEmailUserIDPair",
        name: "masterUser",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBEmailUserIDPair",
        name: "subusers",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBIAPReceipt",
        name: "nonrenewIapReceipts",
        id: 6
      },
      {
        rule: "repeated",
        type: "PBIAPReceipt",
        name: "autorenewIapReceipts",
        id: 7
      },
      {
        rule: "repeated",
        type: "PBStripeCharge",
        name: "nonrenewStripeCharges",
        id: 9
      },
      {
        rule: "repeated",
        type: "PBGooglePlayPurchase",
        name: "googlePlayPurchases",
        id: 12
      },
      {
        rule: "optional",
        type: "string",
        name: "googlePlayPurchaseToken",
        id: 13
      },
      {
        rule: "repeated",
        type: "string",
        name: "googlePlayOrderIds",
        id: 17
      },
      {
        rule: "optional",
        type: "int32",
        name: "subuserLimit",
        id: 8,
        options: {
          default: 5
        }
      },
      {
        rule: "repeated",
        type: "string",
        name: "sentEmailIdentifiers",
        id: 10
      },
      {
        rule: "optional",
        type: "bool",
        name: "userConfirmedNotRenewing",
        id: 11
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsCanceled",
        id: 20
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsPendingDowngrade",
        id: 26
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsInStripeAutorenewMigrationPeriod",
        id: 27
      },
      {
        rule: "optional",
        type: "string",
        name: "stripeCustomerId",
        id: 18
      },
      {
        rule: "optional",
        type: "string",
        name: "stripeSubscriptionId",
        id: 21
      },
      {
        rule: "repeated",
        type: "PBStripeSubscriptionInvoice",
        name: "stripeSubscriptionInvoices",
        id: 19
      },
      {
        rule: "optional",
        type: "string",
        name: "stripePaymentMethodLast4",
        id: 22
      },
      {
        rule: "optional",
        type: "int32",
        name: "stripePaymentMethodExpirationMonth",
        id: 23
      },
      {
        rule: "optional",
        type: "int32",
        name: "stripePaymentMethodExpirationYear",
        id: 24
      },
      {
        rule: "optional",
        type: "string",
        name: "stripePaymentMethodBrand",
        id: 25
      }
    ]
  },
  {
    name: "PBIAPReceipt",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "transactionId",
        id: 1
      },
      {
        rule: "optional",
        type: "bytes",
        name: "receiptData",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "parsedReceipt",
        id: 3
      }
    ]
  },
  {
    name: "PBStripeCharge",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "chargeId",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "charge",
        id: 2
      }
    ]
  },
  {
    name: "PBGooglePlayPurchase",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "orderId",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "purchaseToken",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "purchaseInfo",
        id: 2
      }
    ]
  },
  {
    name: "PBStripeSubscriptionInvoice",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "subscriptionId",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "invoiceId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "subscription",
        id: 3
      }
    ]
  },
  {
    name: "PBUserEmailInfo",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "unsubscribeId",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "sentMessageIdentifiers",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldSendNewsletters",
        id: 3
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldSendOnboardingTips",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldSendSubscriptionLifecycleMessages",
        id: 6
      }
    ]
  },
  {
    name: "PBEmailSuppressionInfo",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "emailAddress",
        id: 2
      },
      {
        rule: "optional",
        type: "bool",
        name: "shouldSuppressAllMessages",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBEmailEvent",
        name: "emailEvents",
        id: 4
      }
    ]
  },
  {
    name: "PBEmailEvent",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "eventType",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "eventData",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "description",
        id: 3
      }
    ]
  },
  {
    name: "PBAccountInfoResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "firstName",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "lastName",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "email",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "isPremiumUser",
        id: 5
      },
      {
        rule: "optional",
        type: "int32",
        name: "subscriptionType",
        id: 6
      },
      {
        rule: "optional",
        type: "int32",
        name: "subscriptionManagementSystem",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "expirationTimestampMsStr",
        id: 7
      },
      {
        rule: "optional",
        type: "int64",
        name: "expirationTimestampMs",
        id: 11
      },
      {
        rule: "optional",
        type: "PBEmailUserIDPair",
        name: "masterUser",
        id: 8
      },
      {
        rule: "repeated",
        type: "PBEmailUserIDPair",
        name: "subusers",
        id: 9
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsCanceled",
        id: 13
      },
      {
        rule: "optional",
        type: "bool",
        name: "subscriptionIsPendingDowngrade",
        id: 14
      },
      {
        rule: "optional",
        type: "string",
        name: "icalendarId",
        id: 12
      }
    ]
  },
  {
    name: "PBAppNoticesResponse",
    fields: [
      {
        rule: "repeated",
        type: "PBAppNotice",
        name: "newGlobalNotices",
        id: 1
      },
      {
        rule: "repeated",
        type: "PBAppNotice",
        name: "updatedGlobalNotices",
        id: 2
      },
      {
        rule: "repeated",
        type: "string",
        name: "removedGlobalNoticeIds",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBAppNotice",
        name: "newUserNotices",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBAppNotice",
        name: "updatedUserNotices",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "removedUserNoticeIds",
        id: 6
      },
      {
        rule: "optional",
        type: "PBAppNoticesUserData",
        name: "userData",
        id: 7
      }
    ]
  },
  {
    name: "PBAccountChangePasswordResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "errorTitle",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "errorMessage",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "refreshToken",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "accessToken",
        id: 5
      }
    ]
  },
  {
    name: "PBRedemptionCodeInfo",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "redemptionCode",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "purchasingUserId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "redeemingUserId",
        id: 4
      },
      {
        rule: "optional",
        type: "double",
        name: "redemptionTimestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "int32",
        name: "subscriptionType",
        id: 6
      },
      {
        rule: "optional",
        type: "double",
        name: "creationTimestamp",
        id: 7
      },
      {
        rule: "optional",
        type: "bool",
        name: "wasPurchased",
        id: 8
      }
    ]
  },
  {
    name: "PBRedemptionCodeResponse",
    fields: [
      {
        rule: "optional",
        type: "int32",
        name: "statusCode",
        id: 1
      },
      {
        rule: "optional",
        type: "PBAccountInfoResponse",
        name: "accountInfo",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "errorTitle",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "errorMessage",
        id: 4
      }
    ]
  },
  {
    name: "PBAuthTokenInfo",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "isBlacklisted",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 3
      },
      {
        rule: "optional",
        type: "int64",
        name: "creationTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "int64",
        name: "expirationTimestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "int64",
        name: "blacklistedTimestamp",
        id: 6
      },
      {
        rule: "optional",
        type: "int64",
        name: "lastUsedForRefreshTimestamp",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "replacementTokenId",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "replacementTokenStr",
        id: 9
      },
      {
        rule: "optional",
        type: "int64",
        name: "replacementTokenGenerationTimestamp",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "clientPlatform",
        id: 11
      }
    ]
  },
  {
    name: "PBIdentifierList",
    fields: [
      {
        rule: "optional",
        type: "double",
        name: "timestamp",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "identifiers",
        id: 2
      }
    ]
  },
  {
    name: "PBEmailUserIDPair",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "email",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "fullName",
        id: 3
      }
    ]
  },
  {
    name: "PBNotificationLocation",
    fields: [
      {
        rule: "required",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "double",
        name: "latitude",
        id: 2
      },
      {
        rule: "optional",
        type: "double",
        name: "longitude",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "address",
        id: 5
      }
    ]
  },
  {
    name: "PBUserDataClientTimestamps",
    fields: [
      {
        rule: "optional",
        type: "PBTimestampList",
        name: "shoppingListTimestamps",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListFolderTimestamps",
        name: "listFolderTimestamps",
        id: 2
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "userRecipeDataTimestamp",
        id: 3
      },
      {
        rule: "optional",
        type: "PBLogicalTimestamp",
        name: "mealPlanningCalendarTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "categorizedItemsTimestamp",
        id: 5
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "userCategoriesTimestamp",
        id: 6
      },
      {
        rule: "optional",
        type: "PBTimestampList",
        name: "starterListTimestamps",
        id: 7
      },
      {
        rule: "optional",
        type: "PBTimestampList",
        name: "recentItemTimestamps",
        id: 8
      },
      {
        rule: "optional",
        type: "PBTimestampList",
        name: "favoriteItemTimestamps",
        id: 9
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "orderedStarterListIdsTimestamp",
        id: 10
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "listSettingsTimestamp",
        id: 11
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "starterListSettingsTimestamp",
        id: 12
      },
      {
        rule: "optional",
        type: "PBTimestamp",
        name: "mobileAppSettingsTimestamp",
        id: 13
      },
      {
        rule: "optional",
        type: "PBLogicalTimestampList",
        name: "shoppingListLogicalTimestamps",
        id: 14
      }
    ]
  },
  {
    name: "PBUserDataResponse",
    fields: [
      {
        rule: "optional",
        type: "ShoppingListsResponse",
        name: "shoppingListsResponse",
        id: 1
      },
      {
        rule: "optional",
        type: "PBListFoldersResponse",
        name: "listFoldersResponse",
        id: 2
      },
      {
        rule: "optional",
        type: "PBRecipeDataResponse",
        name: "recipeDataResponse",
        id: 3
      },
      {
        rule: "optional",
        type: "PBCalendarResponse",
        name: "mealPlanningCalendarResponse",
        id: 4
      },
      {
        rule: "optional",
        type: "PBCategorizedItemsList",
        name: "categorizedItemsResponse",
        id: 5
      },
      {
        rule: "optional",
        type: "PBUserCategoryData",
        name: "userCategoriesResponse",
        id: 6
      },
      {
        rule: "optional",
        type: "StarterListsResponseV2",
        name: "starterListsResponse",
        id: 7
      },
      {
        rule: "optional",
        type: "PBIdentifierList",
        name: "orderedStarterListIdsResponse",
        id: 8
      },
      {
        rule: "optional",
        type: "PBListSettingsList",
        name: "listSettingsResponse",
        id: 9
      },
      {
        rule: "optional",
        type: "PBListSettingsList",
        name: "starterListSettingsResponse",
        id: 10
      },
      {
        rule: "optional",
        type: "PBMobileAppSettings",
        name: "mobileAppSettingsResponse",
        id: 11
      }
    ]
  },
  {
    name: "PBValue",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "repeated",
        type: "string",
        name: "stringValue",
        id: 2
      },
      {
        rule: "optional",
        type: "bool",
        name: "boolValue",
        id: 3
      },
      {
        rule: "optional",
        type: "int32",
        name: "intValue",
        id: 4
      },
      {
        rule: "optional",
        type: "double",
        name: "doubleValue",
        id: 5
      },
      {
        rule: "optional",
        type: "bytes",
        name: "dataValue",
        id: 6
      },
      {
        rule: "optional",
        type: "bytes",
        name: "encodedPb",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "pbClassName",
        id: 8
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestampValue",
        id: 9
      },
      {
        rule: "map",
        type: "PBRecipeCollectionSettings",
        keytype: "string",
        name: "recipeCollectionSettingsMap",
        id: 10
      }
    ]
  },
  {
    name: "PBValueList",
    fields: [
      {
        rule: "repeated",
        type: "PBValue",
        name: "values",
        id: 1
      }
    ]
  },
  {
    name: "PBDeletedObjectID",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 2
      }
    ]
  },
  {
    name: "PBDeletedObjectIDList",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "containerId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "logicalClockId",
        id: 3
      },
      {
        rule: "optional",
        type: "uint64",
        name: "creationLogicalTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBDeletedObjectID",
        name: "deletedObjectIds",
        id: 6
      }
    ]
  },
  {
    name: "PBEmailUserIDPairList",
    fields: [
      {
        rule: "repeated",
        type: "PBEmailUserIDPair",
        name: "emailUserIdPair",
        id: 1
      }
    ]
  },
  {
    name: "PBRecipeLinkRequestList",
    fields: [
      {
        rule: "repeated",
        type: "PBRecipeLinkRequest",
        name: "recipeLinkRequest",
        id: 1
      }
    ]
  },
  {
    name: "PBSyncOperation",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "operationQueueId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "operationClassName",
        id: 3
      },
      {
        rule: "optional",
        type: "bytes",
        name: "encodedOperation",
        id: 4
      }
    ]
  },
  {
    name: "PBWatchSyncResponse",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "watchId",
        id: 23
      },
      {
        rule: "optional",
        type: "string",
        name: "userId",
        id: 1
      },
      {
        rule: "optional",
        type: "bool",
        name: "isPremiumUser",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "rootFolderId",
        id: 3
      },
      {
        rule: "optional",
        type: "uint64",
        name: "logicalTimestamp",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "isFullSync",
        id: 22
      },
      {
        rule: "repeated",
        type: "ShoppingList",
        name: "shoppingLists",
        id: 5
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedShoppingListIds",
        id: 6
      },
      {
        rule: "repeated",
        type: "ListItem",
        name: "listItems",
        id: 7
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListItemIds",
        id: 8
      },
      {
        rule: "repeated",
        type: "PBStore",
        name: "stores",
        id: 9
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedStoresIds",
        id: 10
      },
      {
        rule: "repeated",
        type: "PBStoreFilter",
        name: "storeFilters",
        id: 11
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedStoreFilterIds",
        id: 12
      },
      {
        rule: "repeated",
        type: "PBListSettings",
        name: "listSettings",
        id: 13
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListSettingIds",
        id: 14
      },
      {
        rule: "repeated",
        type: "PBCategoryGrouping",
        name: "categoryGroups",
        id: 15
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedCategoryGroupIds",
        id: 16
      },
      {
        rule: "repeated",
        type: "PBUserCategory",
        name: "categories",
        id: 17
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedCategoryIds",
        id: 18
      },
      {
        rule: "repeated",
        type: "PBListCategory",
        name: "listCategories",
        id: 24
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListCategoryIds",
        id: 25
      },
      {
        rule: "repeated",
        type: "PBListCategoryGroup",
        name: "listCategoryGroups",
        id: 26
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListCategoryGroupIds",
        id: 27
      },
      {
        rule: "repeated",
        type: "PBListCategorizationRule",
        name: "listCategorizationRules",
        id: 28
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListCategorizationRuleIds",
        id: 29
      },
      {
        rule: "repeated",
        type: "PBListFolder",
        name: "listFolders",
        id: 19
      },
      {
        rule: "repeated",
        type: "string",
        name: "deletedListFolderIds",
        id: 20
      },
      {
        rule: "repeated",
        type: "string",
        name: "processedOperationIds",
        id: 21
      }
    ]
  },
  {
    name: "PBWatchSyncMultipartResponsePart",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "fullResponseHash",
        id: 1
      },
      {
        rule: "optional",
        type: "int32",
        name: "partIndex",
        id: 2
      },
      {
        rule: "optional",
        type: "int32",
        name: "partsCount",
        id: 3
      },
      {
        rule: "optional",
        type: "bytes",
        name: "responsePart",
        id: 4
      }
    ]
  },
  {
    name: "PBWatchSyncMultipartResponse",
    fields: [
      {
        rule: "repeated",
        type: "PBWatchSyncMultipartResponsePart",
        name: "reponsePart",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "fullResponseHash",
        id: 2
      },
      {
        rule: "optional",
        type: "uint64",
        name: "responseLogicalTimestamp",
        id: 3
      }
    ]
  },
  {
    name: "PBAlexaUser",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaUserId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 3
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasListReadPermission",
        id: 4
      },
      {
        rule: "optional",
        type: "bool",
        name: "hasListWritePermission",
        id: 5
      },
      {
        rule: "optional",
        type: "bool",
        name: "isSkillEnabled",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "accountLinkedTimestamp",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "skillEnabledTimestamp",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "skillPermissionTimestamp",
        id: 10
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaApiEndpoint",
        id: 11
      }
    ]
  },
  {
    name: "PBAlexaList",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaListId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistListId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaUserId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "name",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBAlexaListItem",
        name: "items",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "state",
        id: 7
      },
      {
        rule: "optional",
        type: "int32",
        name: "version",
        id: 8
      }
    ]
  },
  {
    name: "PBAlexaListItem",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaItemId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistItemId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaListId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaUserId",
        id: 5
      },
      {
        rule: "optional",
        type: "int32",
        name: "version",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "itemValue",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "status",
        id: 8
      }
    ]
  },
  {
    name: "PBAlexaListOperation",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "operationType",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaUserId",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBAlexaListItem",
        name: "operationItems",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBAlexaList",
        name: "operationLists",
        id: 5
      }
    ]
  },
  {
    name: "PBAlexaTask",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "alexaUserId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "eventJson",
        id: 3
      },
      {
        rule: "optional",
        type: "PBAlexaListOperation",
        name: "listOperation",
        id: 4
      }
    ]
  },
  {
    name: "PBGoogleAssistantUser",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "listActionsApiRefreshToken",
        id: 3
      },
      {
        rule: "optional",
        type: "bool",
        name: "isGoogleAssistantAccountLinked",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistRefreshToken",
        id: 6
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistAccessToken",
        id: 7
      },
      {
        rule: "optional",
        type: "bool",
        name: "isActiveGoogleAssistantProvider",
        id: 5
      }
    ]
  },
  {
    name: "PBGoogleAssistantList",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "googleAssistantCreateToken",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistListId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "title",
        id: 5
      },
      {
        rule: "repeated",
        type: "PBGoogleAssistantListItem",
        name: "items",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "isArchived",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "createTime",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "updateTime",
        id: 9
      }
    ]
  },
  {
    name: "PBGoogleAssistantListItem",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "googleAssistantCreateToken",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistItemId",
        id: 3
      },
      {
        rule: "optional",
        type: "string",
        name: "googleAssistantListId",
        id: 4
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "content",
        id: 6
      },
      {
        rule: "optional",
        type: "bool",
        name: "isChecked",
        id: 7
      },
      {
        rule: "optional",
        type: "string",
        name: "createTime",
        id: 8
      },
      {
        rule: "optional",
        type: "string",
        name: "updateTime",
        id: 9
      }
    ]
  },
  {
    name: "PBGoogleAssistantListOperation",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "operationType",
        id: 2
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 3
      },
      {
        rule: "repeated",
        type: "PBGoogleAssistantListItem",
        name: "operationItems",
        id: 4
      },
      {
        rule: "repeated",
        type: "PBGoogleAssistantList",
        name: "operationLists",
        id: 5
      },
      {
        rule: "optional",
        type: "string",
        name: "googleAssistantListId",
        id: 6
      }
    ]
  },
  {
    name: "PBGoogleAssistantTask",
    fields: [
      {
        rule: "optional",
        type: "string",
        name: "identifier",
        id: 1
      },
      {
        rule: "optional",
        type: "string",
        name: "anylistUserId",
        id: 2
      },
      {
        rule: "optional",
        type: "PBGoogleAssistantListOperation",
        name: "listOperation",
        id: 3
      }
    ]
  },
  {
    name: "PBProductLookupResponse",
    fields: [
      {
        rule: "optional",
        type: "ListItem",
        name: "listItem",
        id: 1
      }
    ]
  }
];
var definitions_default = {
  package: package2,
  messages
};

// src/list.ts
import FormData2 from "form-data";

// src/item.ts
import FormData from "form-data";

// src/uuid.ts
import * as uuid from "uuid";
var uuid_default = () => uuid.v4().replace(/-/g, "");

// src/item.ts
var OP_MAPPING = {
  name: "set-list-item-name",
  quantity: "set-list-item-quantity",
  details: "set-list-item-details",
  checked: "set-list-item-checked",
  categoryMatchId: "set-list-item-category-match-id",
  manualSortIndex: "set-list-item-sort-order"
};
var Item = class {
  constructor(item, context) {
    this._fieldsToUpdate = [];
    this._listId = item.listId;
    this._identifier = item.identifier || uuid_default();
    this._name = item.name;
    this._details = item.details;
    this._quantity = item.quantity;
    this._checked = item.checked;
    this._manualSortIndex = item.manualSortIndex;
    this._userId = item.userId;
    this._categoryMatchId = item.categoryMatchId || "other";
    this._client = context.client;
    this._protobuf = context.protobuf;
    this._uid = context.uid;
  }
  toJSON() {
    return {
      listId: this._listId,
      identifier: this._identifier,
      name: this._name,
      details: this._details,
      quantity: this._quantity,
      checked: this._checked,
      manualSortIndex: this._manualSortIndex,
      userId: this._userId,
      categoryMatchId: this._categoryMatchId
    };
  }
  _encode() {
    return new this._protobuf.ListItem({
      identifier: this._identifier,
      listId: this._listId,
      name: this._name,
      quantity: this._quantity,
      details: this._details,
      checked: this._checked,
      userId: this._userId,
      categoryMatchId: this._categoryMatchId,
      manualSortIndex: this._manualSortIndex
    });
  }
  get identifier() {
    return this._identifier;
  }
  set identifier(_) {
    throw new Error("You cannot update an item ID.");
  }
  get listId() {
    return this._listId;
  }
  set listId(l) {
    if (this._listId === void 0) {
      this._listId = l;
      this._fieldsToUpdate.push("listId");
    } else {
      throw new Error("You cannot move items between lists.");
    }
  }
  get name() {
    return this._name;
  }
  set name(n) {
    this._name = n;
    this._fieldsToUpdate.push("name");
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(q) {
    if (typeof q === "number") {
      q = q.toString();
    }
    this._quantity = q;
    this._fieldsToUpdate.push("quantity");
  }
  get details() {
    return this._details;
  }
  set details(d) {
    this._details = d;
    this._fieldsToUpdate.push("details");
  }
  get checked() {
    return this._checked;
  }
  set checked(c) {
    if (c !== void 0 && typeof c !== "boolean") {
      throw new TypeError("Checked must be a boolean.");
    }
    this._checked = c;
    this._fieldsToUpdate.push("checked");
  }
  get userId() {
    return this._userId;
  }
  set userId(_) {
    throw new Error("Cannot set user ID of an item after creation.");
  }
  get categoryMatchId() {
    return this._categoryMatchId;
  }
  set categoryMatchId(i) {
    this._categoryMatchId = i;
    this._fieldsToUpdate.push("categoryMatchId");
  }
  get manualSortIndex() {
    return this._manualSortIndex;
  }
  set manualSortIndex(i) {
    if (i !== void 0 && typeof i !== "number") {
      throw new TypeError("Sort index must be a number.");
    }
    this._manualSortIndex = i;
    this._fieldsToUpdate.push("manualSortIndex");
  }
  /**
   * Save local changes to item to AnyList's API.
   * Must set `isFavorite=true` if editing "favorites" list
   */
  async save(isFavorite = false) {
    const ops = this._fieldsToUpdate.map((field) => {
      const value = this[field];
      const opName = OP_MAPPING[field];
      const op = new this._protobuf.PBListOperation();
      op.setMetadata({
        operationId: uuid_default(),
        handlerId: opName,
        userId: this._uid
      });
      op.setListId(this._listId);
      op.setListItemId(this._identifier);
      if (typeof value === "boolean") {
        op.setUpdatedValue(value === true ? "y" : "n");
      } else {
        op.setUpdatedValue(value.toString());
      }
      return op;
    });
    const opList = new this._protobuf.PBListOperationList();
    opList.setOperations(ops);
    const form = new FormData();
    form.append("operations", opList.toBuffer());
    await this._client.post(
      isFavorite ? "data/starter-lists/update" : "data/shopping-lists/update",
      {
        body: form
      }
    );
  }
};

// src/list.ts
var List = class {
  constructor(list, context) {
    this.identifier = list.identifier;
    this.parentId = list.listId;
    this.name = list.name;
    this.items = (list.items || []).map((i) => new Item(i, context));
    this.client = context.client;
    this.protobuf = context.protobuf;
    this.uid = context.uid;
  }
  /**
   * Adds an item to this list.
   * Will also save item to local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
  async addItem(item, isFavorite = false) {
    if (!(item instanceof Item)) {
      throw new TypeError("Must be an instance of the Item class.");
    }
    item.listId = this.identifier;
    const op = new this.protobuf.PBListOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId: isFavorite ? "add-item" : "add-shopping-list-item",
      userId: this.uid
    });
    op.setListId(this.identifier);
    op.setListItemId(item.identifier);
    op.setListItem(item._encode());
    const ops = new this.protobuf.PBListOperationList();
    ops.setOperations([op]);
    const form = new FormData2();
    form.append("operations", ops.toBuffer());
    await this.client.post(
      isFavorite ? "data/starter-lists/update" : "data/shopping-lists/update",
      {
        body: form
      }
    );
    this.items.push(item);
    return item;
  }
  /**
   * Uncheck all items in a list
   */
  async uncheckAll() {
    const op = new this.protobuf.PBListOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId: "uncheck-all",
      userId: this.uid
    });
    op.setListId(this.identifier);
    const ops = new this.protobuf.PBListOperationList();
    ops.setOperations([op]);
    const form = new FormData2();
    form.append("operations", ops.toBuffer());
    await this.client.post("data/shopping-lists/update", {
      body: form
    });
  }
  /**
   * Remove an item from this list.
   * Will also remove item from local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
  async removeItem(item, isFavorite = false) {
    const op = new this.protobuf.PBListOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId: isFavorite ? "remove-item" : "remove-shopping-list-item",
      userId: this.uid
    });
    op.setListId(this.identifier);
    op.setListItemId(item.identifier);
    op.setListItem(item._encode());
    const ops = new this.protobuf.PBListOperationList();
    ops.setOperations([op]);
    const form = new FormData2();
    form.append("operations", ops.toBuffer());
    await this.client.post(
      isFavorite ? "data/starter-lists/update" : "data/shopping-lists/update",
      {
        body: form
      }
    );
    this.items = this.items.filter((i) => i.identifier !== item.identifier);
  }
  /**
   * Get Item from List by identifier.
   */
  getItemById(identifier) {
    return this.items.find((i) => i.identifier === identifier);
  }
  /**
   * Get Item from List by name.
   */
  getItemByName(name) {
    return this.items.find((i) => i.name === name);
  }
};

// src/recipe.ts
import FormData3 from "form-data";

// src/ingredient.ts
var Ingredient = class {
  constructor(ingredient, context) {
    this._fieldsToUpdate = [];
    this._rawIngredient = ingredient.rawIngredient;
    this._name = ingredient.name;
    this._quantity = ingredient.quantity;
    this._note = ingredient.note;
    this._client = context.client;
    this._protobuf = context.protobuf;
    this._uid = context.uid;
  }
  toJSON() {
    return {
      rawIngredient: this._rawIngredient,
      name: this._name,
      quantity: this._quantity,
      note: this._note
    };
  }
  _encode() {
    return new this._protobuf.PBIngredient({
      name: this._name,
      quantity: this._quantity,
      rawIngredient: this._rawIngredient,
      note: this._note
    });
  }
  get rawIngredient() {
    return this._rawIngredient;
  }
  set rawIngredient(n) {
    this._rawIngredient = n;
    this._fieldsToUpdate.push("rawIngredient");
  }
  get name() {
    return this._name;
  }
  set name(n) {
    this._name = n;
    this._fieldsToUpdate.push("name");
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(q) {
    this._quantity = q;
    this._fieldsToUpdate.push("quantity");
  }
  get note() {
    return this._note;
  }
  set note(n) {
    this._note = n;
    this._fieldsToUpdate.push("note");
  }
};

// src/recipe.ts
var Recipe = class {
  constructor(recipe, context) {
    this.identifier = recipe.identifier || uuid_default();
    this.timestamp = recipe.timestamp || Date.now() / 1e3;
    this.name = recipe.name;
    this.note = recipe.note;
    this.sourceName = recipe.sourceName;
    this.sourceUrl = recipe.sourceUrl;
    this.ingredients = recipe.ingredients ? recipe.ingredients.map((i) => new Ingredient(i, context)) : [];
    this.preparationSteps = recipe.preparationSteps ?? [];
    this.photoIds = recipe.photoIds ?? [];
    this.photoUrls = recipe.photoUrls ?? [];
    this.adCampaignId = recipe.adCampaignId;
    this.scaleFactor = recipe.scaleFactor;
    this.rating = recipe.rating;
    this.creationTimestamp = recipe.creationTimestamp;
    this.nutritionalInfo = recipe.nutritionalInfo;
    this.cookTime = recipe.cookTime;
    this.prepTime = recipe.prepTime;
    this.servings = recipe.servings;
    this.paprikaIdentifier = recipe.paprikaIdentifier;
    this._client = context.client;
    this.protobuf = context.protobuf;
    this.uid = context.uid;
    this.recipeDataId = context.recipeDataId;
  }
  _encode() {
    return new this.protobuf.PBRecipe({
      identifier: this.identifier,
      timestamp: this.timestamp,
      name: this.name,
      note: this.note,
      sourceName: this.sourceName,
      sourceUrl: this.sourceUrl,
      ingredients: this.ingredients.map((x) => x._encode()),
      preparationSteps: this.preparationSteps,
      photoIds: this.photoIds,
      adCampaignId: this.adCampaignId,
      photoUrls: this.photoUrls,
      scaleFactor: this.scaleFactor,
      rating: this.rating,
      creationTimestamp: this.creationTimestamp,
      nutritionalInfo: this.nutritionalInfo,
      cookTime: this.cookTime,
      prepTime: this.prepTime,
      servings: this.servings,
      paprikaIdentifier: this.paprikaIdentifier
    });
  }
  /**
   * Perform a recipe operation.
   */
  async performOperation(handlerId) {
    const ops = new this.protobuf.PBRecipeOperationList();
    const op = new this.protobuf.PBRecipeOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId,
      userId: this.uid
    });
    op.setRecipeDataId(this.recipeDataId);
    op.setRecipe(this._encode());
    op.setRecipeIds(this.recipeDataId);
    ops.setOperations(op);
    const form = new FormData3();
    form.append("operations", ops.toBuffer());
    await this._client.post("data/user-recipe-data/update", {
      body: form
    });
  }
  /**
   * Save local changes to recipe to AnyList's API.
   */
  async save() {
    await this.performOperation("save-recipe");
  }
  /**
   * Delete local changes to recipe to AnyList's API.
   */
  async delete() {
    await this.performOperation("remove-recipe");
  }
};

// src/recipe-collection.ts
import FormData4 from "form-data";
var RecipeCollection = class {
  constructor(recipeCollection, context) {
    this._client = context.client;
    this.protobuf = context.protobuf;
    this.uid = context.uid;
    this.recipeDataId = context.recipeDataId;
    this.identifier = recipeCollection.identifier || uuid_default();
    this.timestamp = Date.now() / 1e3;
    this.name = recipeCollection.name;
    this.recipeIds = recipeCollection.recipeIds ?? [];
    this.collectionSettings = new this.protobuf.PBRecipeCollectionSettings();
  }
  _encode() {
    return new this.protobuf.PBRecipeCollection({
      identifier: this.identifier,
      timestamp: this.timestamp,
      name: this.name,
      recipeIds: this.recipeIds,
      collectionSettings: this.collectionSettings
    });
  }
  /**
   * Perform a recipe operation.
   */
  async performOperation(handlerId) {
    const ops = new this.protobuf.PBRecipeOperationList();
    const op = new this.protobuf.PBRecipeOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId,
      userId: this.uid
    });
    op.setRecipeDataId(this.recipeDataId);
    op.setRecipeCollection(this._encode());
    ops.setOperations(op);
    const form = new FormData4();
    form.append("operations", ops.toBuffer());
    await this._client.post("data/user-recipe-data/update", {
      body: form
    });
  }
  /**
   * Save local changes to recipe to AnyList's API.
   */
  async save() {
    await this.performOperation("new-recipe-collection");
  }
  /**
   * Delete a recipe collection from AnyList.
   */
  async delete() {
    await this.performOperation("remove-recipe-collection");
  }
  /**
   * Adds an existing recipe to an existing recipe-collection on AnyList.
   */
  async addRecipe(recipeId) {
    if (recipeId) {
      this.recipeIds.push(recipeId);
      await this.performOperation("add-recipes-to-collection");
    }
  }
  /**
   * Remove existing recipe from an existing recipe-collection on AnyList.
   */
  async removeRecipe(recipeId) {
    const recipeIdPos = this.recipeIds.indexOf(recipeId);
    if (recipeIdPos > -1) {
      await this.performOperation("remove-recipes-from-collection");
      this.recipeIds.splice(recipeIdPos, 1);
    }
  }
};

// src/meal-planning-calendar-event.ts
import FormData5 from "form-data";
var MealPlanningCalendarEvent = class {
  constructor(event, context) {
    this.recipe = null;
    this.label = null;
    this.identifier = event.identifier || uuid_default();
    this.date = typeof event.date === "string" ? new Date(event.date) : event.date || /* @__PURE__ */ new Date();
    this.details = event.details;
    this.labelId = event.labelId;
    this.logicalTimestamp = event.logicalTimestamp;
    this.orderAddedSortIndex = event.orderAddedSortIndex;
    this.recipeId = event.recipeId;
    this.recipeScaleFactor = event.recipeScaleFactor;
    this.title = event.title;
    this._client = context.client;
    this._protobuf = context.protobuf;
    this._uid = context.uid;
    this._isNew = !event.identifier;
    this._calendarId = context.calendarId;
  }
  toJSON() {
    return {
      identifier: this.identifier,
      logicalTimestamp: this.logicalTimestamp,
      calendarId: this._calendarId,
      date: this.date,
      title: this.title,
      details: this.details,
      recipeId: this.recipeId,
      labelId: this.labelId,
      orderAddedSortIndex: this.orderAddedSortIndex,
      labelSortIndex: void 0,
      // This property was referenced but not defined in original
      recipeScaleFactor: this.recipeScaleFactor
    };
  }
  _encode() {
    return new this._protobuf.PBCalendarEvent({
      identifier: this.identifier,
      logicalTimestamp: this.logicalTimestamp,
      calendarId: this._calendarId,
      date: this.date.toISOString().slice(0, 10),
      // Only date, no time
      title: this.title,
      details: this.details,
      recipeId: this.recipeId,
      labelId: this.labelId,
      orderAddedSortIndex: this.orderAddedSortIndex,
      labelSortIndex: void 0,
      // This property was referenced but not defined in original
      recipeScaleFactor: this.recipeScaleFactor
    });
  }
  /**
   * Perform a recipe operation.
   */
  async performOperation(handlerId) {
    const ops = new this._protobuf.PBCalendarOperationList();
    const op = new this._protobuf.PBCalendarOperation();
    op.setMetadata({
      operationId: uuid_default(),
      handlerId,
      userId: this._uid
    });
    op.setCalendarId(this._calendarId);
    op.setUpdatedEvent(this._encode());
    ops.setOperations([op]);
    const form = new FormData5();
    form.append("operations", ops.toBuffer());
    await this._client.post("data/meal-planning-calendar/update", {
      body: form
    });
  }
  /**
   * Save local changes to the calendar event to AnyList's API.
   */
  async save() {
    const operation = this._isNew ? "new-event" : "set-event-details";
    await this.performOperation(operation);
  }
  /**
   * Delete this event from the calendar via AnyList's API.
   */
  async delete() {
    await this.performOperation("delete-event");
  }
};

// src/meal-planning-calendar-label.ts
var MealPlanningCalendarEventLabel = class {
  constructor(label) {
    this.identifier = label.identifier;
    this.calendarId = label.calendarId;
    this.hexColor = label.hexColor;
    this.logicalTimestamp = label.logicalTimestamp;
    this.name = label.name;
    this.sortIndex = label.sortIndex;
  }
};

// src/index.ts
var CREDENTIALS_KEY_CLIENT_ID = "clientId";
var CREDENTIALS_KEY_ACCESS_TOKEN = "accessToken";
var CREDENTIALS_KEY_REFRESH_TOKEN = "refreshToken";
var AnyList = class extends EventEmitter {
  constructor(options) {
    super();
    this.lists = [];
    this.favoriteItems = [];
    this.recentItems = {};
    this.recipes = [];
    this.email = options.email;
    this.password = options.password;
    this.credentialsFile = options.credentialsFile ?? path.join(os.homedir(), ".anylist_credentials");
    this.authClient = got.extend({
      headers: {
        "X-AnyLeaf-API-Version": "3"
      },
      prefixUrl: "https://www.anylist.com",
      followRedirect: false,
      hooks: {
        beforeError: [
          (error) => {
            var _a, _b;
            const { response } = error;
            if ((_b = (_a = response == null ? void 0 : response.request) == null ? void 0 : _a.options) == null ? void 0 : _b.url) {
              const url = response.request.options.url.href;
              console.error(`Endpoint ${url} returned uncaught status code ${response.statusCode}`);
            }
            return error;
          }
        ]
      }
    });
    this.client = this.authClient.extend({
      mutableDefaults: true,
      hooks: {
        beforeRequest: [
          (options2) => {
            options2.headers = {
              "X-AnyLeaf-Client-Identifier": this.clientId,
              authorization: `Bearer ${this.accessToken}`,
              ...options2.headers
            };
            const pathname = options2.url.pathname;
            if (pathname.startsWith("/data/")) {
              options2.responseType = "buffer";
            }
          }
        ],
        afterResponse: [
          async (response, retryWithMergedOptions) => {
            if (response.statusCode !== 401) {
              return response;
            }
            const url = response.request.options.url.href;
            console.info(`Endpoint ${url} returned status code 401, refreshing access token before retrying`);
            await this._refreshTokens();
            return retryWithMergedOptions({
              headers: {
                authorization: `Bearer ${this.accessToken}`
              }
            });
          }
        ],
        beforeError: [
          (error) => {
            var _a, _b;
            const { response } = error;
            if ((_b = (_a = response == null ? void 0 : response.request) == null ? void 0 : _a.options) == null ? void 0 : _b.url) {
              const url = response.request.options.url.href;
              console.error(`Endpoint ${url} returned uncaught status code ${response.statusCode}`);
            }
            return error;
          }
        ]
      }
    });
    this.protobuf = protobuf.newBuilder({}).import(definitions_exports).build("pcov.proto");
  }
  /**
   * Log into the AnyList account provided in the constructor.
   */
  async login(connectWebSocket = true) {
    await this._loadCredentials();
    this.clientId = await this._getClientId();
    if (!this.accessToken || !this.refreshToken) {
      console.info("No saved tokens found, fetching new tokens using credentials");
      await this._fetchTokens();
    }
    if (connectWebSocket) {
      this._setupWebSocket();
    }
  }
  async _fetchTokens() {
    const form = new FormData6();
    form.append("email", this.email);
    form.append("password", this.password);
    const result = await this.authClient.post("auth/token", {
      body: form
    }).json();
    this.accessToken = result.access_token;
    this.refreshToken = result.refresh_token;
    await this._storeCredentials();
  }
  async _refreshTokens() {
    var _a;
    const form = new FormData6();
    form.append("refresh_token", this.refreshToken);
    try {
      const result = await this.authClient.post("auth/token/refresh", {
        body: form
      }).json();
      this.accessToken = result.access_token;
      this.refreshToken = result.refresh_token;
      await this._storeCredentials();
    } catch (error) {
      if (((_a = error.response) == null ? void 0 : _a.statusCode) !== 401) {
        throw error;
      }
      console.info("Failed to refresh access token, fetching new tokens using credentials");
      await this._fetchTokens();
    }
  }
  async _getClientId() {
    if (this.clientId) {
      return this.clientId;
    }
    console.info("No saved clientId found, generating new clientId");
    const clientId = uuid_default();
    this.clientId = clientId;
    await this._storeCredentials();
    return clientId;
  }
  async _loadCredentials() {
    if (!this.credentialsFile) {
      return;
    }
    if (!fs.existsSync(this.credentialsFile)) {
      console.info("Credentials file does not exist, not loading saved credentials");
      return;
    }
    try {
      const encrypted = await fs.promises.readFile(this.credentialsFile);
      const credentials = this._decryptCredentials(encrypted, this.password);
      this.clientId = credentials[CREDENTIALS_KEY_CLIENT_ID];
      this.accessToken = credentials[CREDENTIALS_KEY_ACCESS_TOKEN];
      this.refreshToken = credentials[CREDENTIALS_KEY_REFRESH_TOKEN];
    } catch (error) {
      console.error(`Failed to read stored credentials: ${error.stack}`);
    }
  }
  async _storeCredentials() {
    if (!this.credentialsFile) {
      return;
    }
    const credentials = {
      [CREDENTIALS_KEY_CLIENT_ID]: this.clientId,
      [CREDENTIALS_KEY_ACCESS_TOKEN]: this.accessToken,
      [CREDENTIALS_KEY_REFRESH_TOKEN]: this.refreshToken
    };
    try {
      const encrypted = this._encryptCredentials(credentials, this.password);
      await fs.promises.writeFile(this.credentialsFile, encrypted);
    } catch (error) {
      console.error(`Failed to write credentials to storage: ${error.stack}`);
    }
  }
  _encryptCredentials(credentials, secret) {
    const plain = JSON.stringify(credentials);
    const key = crypto.createHash("sha256").update(String(secret)).digest("base64").slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer2.from(key), iv);
    let encrypted = cipher.update(plain);
    encrypted = Buffer2.concat([encrypted, cipher.final()]);
    return JSON.stringify({
      iv: iv.toString("hex"),
      cipher: encrypted.toString("hex")
    });
  }
  _decryptCredentials(credentials, secret) {
    const encrypted = JSON.parse(credentials.toString());
    const key = crypto.createHash("sha256").update(String(secret)).digest("base64").slice(0, 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer2.from(key), Buffer2.from(encrypted.iv, "hex"));
    let plain = decipher.update(Buffer2.from(encrypted.cipher, "hex"));
    plain = Buffer2.concat([plain, decipher.final()]);
    return JSON.parse(plain.toString());
  }
  _setupWebSocket() {
    AuthenticatedWebSocket.token = this.accessToken;
    AuthenticatedWebSocket.clientId = this.clientId;
    this.ws = new WebSocket("wss://www.anylist.com/data/add-user-listener", [], {
      WebSocket: AuthenticatedWebSocket
    });
    this.ws.addEventListener("open", () => {
      console.info("Connected to websocket");
      this._heartbeatPing = setInterval(() => {
        this.ws.send("--heartbeat--");
      }, 5e3);
    });
    this.ws.addEventListener("message", (event) => {
      const { data } = event;
      if (data === "refresh-shopping-lists") {
        console.info("Refreshing shopping lists");
        this.getLists().then((lists) => this.emit("lists-update", lists));
      }
    });
    this.ws.addEventListener("error", (event) => {
      const error = event;
      console.error(`Disconnected from websocket: ${error.message}`);
      this._refreshTokens().then(() => {
        AuthenticatedWebSocket.token = this.accessToken;
      });
    });
  }
  /**
   * Call when you're ready for your program to exit.
   */
  teardown() {
    if (this._heartbeatPing) {
      clearInterval(this._heartbeatPing);
    }
    if (this.ws !== void 0) {
      this.ws.close();
    }
  }
  /**
   * Load all lists from account into memory.
   */
  async getLists(refreshCache = true) {
    const decoded = await this._getUserData(refreshCache);
    const context = {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0
      // This would need to be set from decoded user data
    };
    this.lists = decoded.shoppingListsResponse.newLists.map((list) => new List(list, context));
    for (const response of decoded.starterListsResponse.recentItemListsResponse.listResponses) {
      const list = response.starterList;
      this.recentItems[list.listId] = list.items.map((item) => new Item(item, context));
    }
    const favoriteLists = decoded.starterListsResponse.favoriteItemListsResponse.listResponses.map(
      (object) => object.starterList
    );
    this.favoriteItems = favoriteLists.map(
      (list) => new List(list, context)
    );
    return this.lists;
  }
  /**
   * Get List instance by ID.
   */
  getListById(identifier) {
    return this.lists.find((l) => l.identifier === identifier);
  }
  /**
   * Get List instance by name.
   */
  getListByName(name) {
    return this.lists.find((l) => l.name === name);
  }
  /**
   * Get favorite items for a list.
   */
  getFavoriteItemsByListId(identifier) {
    return this.favoriteItems.find((l) => l.parentId === identifier);
  }
  /**
   * Load all meal planning calendar events from account into memory.
   */
  async getMealPlanningCalendarEvents(refreshCache = true) {
    const decoded = await this._getUserData(refreshCache);
    const context = {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0,
      calendarId: this.calendarId
    };
    this.mealPlanningCalendarEvents = decoded.mealPlanningCalendarResponse.events.map(
      (event) => new MealPlanningCalendarEvent(event, context)
    );
    this.mealPlanningCalendarEventLabels = decoded.mealPlanningCalendarResponse.labels.map(
      (label) => new MealPlanningCalendarEventLabel(label)
    );
    if (this.mealPlanningCalendarEvents && this.mealPlanningCalendarEventLabels) {
      for (const event of this.mealPlanningCalendarEvents) {
        event.label = this.mealPlanningCalendarEventLabels.find(
          (label) => label.identifier === event.labelId
        );
      }
    }
    this.recipes = decoded.recipeDataResponse.recipes.map((recipe) => new Recipe(recipe, {
      ...context,
      recipeDataId: this.recipeDataId
    }));
    if (this.mealPlanningCalendarEvents) {
      for (const event of this.mealPlanningCalendarEvents) {
        event.recipe = this.recipes.find((recipe) => recipe.identifier === event.recipeId);
      }
    }
    return this.mealPlanningCalendarEvents || [];
  }
  /**
   * Get the recently added items for a list
   */
  getRecentItemsByListId(listId) {
    return this.recentItems[listId];
  }
  /**
   * Factory function to create new Items.
   */
  createItem(item) {
    return new Item(item, {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0
    });
  }
  /**
   * Factory function to create a new MealPlanningCalendarEvent.
   */
  async createEvent(eventObject) {
    if (!this.calendarId) {
      await this._getUserData();
    }
    return new MealPlanningCalendarEvent(eventObject, {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0,
      calendarId: this.calendarId
    });
  }
  /**
   * Load all recipes from account into memory.
   */
  async getRecipes(refreshCache = true) {
    const decoded = await this._getUserData(refreshCache);
    this.recipes = decoded.recipeDataResponse.recipes.map((recipe) => new Recipe(recipe, {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0,
      recipeDataId: this.recipeDataId
    }));
    this.recipeDataId = decoded.recipeDataResponse.recipeDataId;
    return this.recipes;
  }
  /**
   * Factory function to create new Recipes.
   */
  async createRecipe(recipe) {
    if (!this.recipeDataId) {
      await this.getRecipes();
    }
    return new Recipe(recipe, {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0,
      recipeDataId: this.recipeDataId
    });
  }
  /**
   * Factory function to create new Recipe Collections.
   */
  createRecipeCollection(recipeCollection) {
    return new RecipeCollection(recipeCollection, {
      client: this.client,
      protobuf: this.protobuf,
      uid: void 0,
      recipeDataId: this.recipeDataId
    });
  }
  async _getUserData(refreshCache) {
    if (!this._userData || refreshCache) {
      const result = await this.client.post("data/user-data/get");
      this._userData = this.protobuf.PBUserDataResponse.decode(result.body);
      this.calendarId = this._userData.mealPlanningCalendarResponse.calendarId;
    }
    return this._userData;
  }
};
var AuthenticatedWebSocket = class _AuthenticatedWebSocket extends WS {
  constructor(url, protocols) {
    super(url, protocols, {
      headers: {
        authorization: `Bearer ${_AuthenticatedWebSocket.token}`,
        "x-anyleaf-client-identifier": _AuthenticatedWebSocket.clientId,
        "X-AnyLeaf-API-Version": "3"
      }
    });
  }
};
var index_default = AnyList;
export {
  AnyList,
  index_default as default
};
//# sourceMappingURL=index.mjs.map