// Core internal types for AnyList dependency injection
// This file only contains shared types that are used across multiple modules

/**
 * Internal context interface for dependency injection across AnyList modules.
 * 
 * @example
 * ```typescript
 * const context: AnyListContext = {
 *   client: got.extend({...}),
 *   protobuf: protobufDefinitions,
 *   uid: 'user-123',
 *   accessToken: 'token-abc',
 *   clientId: 'client-456'
 * };
 * ```
 */
export type AnyListContext = {
	/** Got HTTP client instance for API requests */
	client: any; // Got instance
	/** Protobuf message definitions and encoders/decoders */
	protobuf: any; // Protobuf definitions
	/** User ID for authenticated user */
	uid?: string;
	/** Authentication access token */
	accessToken?: string;
	/** Client ID for API authentication */
	clientId?: string;
	/** Recipe data ID for recipe operations */
	recipeDataId?: string;
	/** Calendar ID for meal planning operations */
	calendarId?: string;
};