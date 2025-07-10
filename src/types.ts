// Core internal types for AnyList dependency injection
// This file only contains shared types that are used across multiple modules

// Internal context interface for dependency injection
export type AnyListContext = {
	client: any; // Got instance
	protobuf: any; // Protobuf definitions
	uid?: string;
	accessToken?: string;
	clientId?: string;
	recipeDataId?: string;
	calendarId?: string;
};
