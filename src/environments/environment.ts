/**
 * Local development only
 *
 * This API key is used strictly for local testing and development purposes.
 * In a production-ready application, API keys must NEVER be stored in a
 * frontend (client-side) application.
 *
 * For production, secrets should be stored securely in a secrets manager
 * or vault (e.g. AWS Secrets Manager, Vault, etc.) and accessed via an
 * internal backend API that proxies the request.
 */
export const environment = {
  weatherApiKey: 'YOUR_WEATHER_API_KEY',
};
