import axios from 'axios';

const subfeedClient = axios.create({
  baseURL: process.env.SUBFEED_API_URL || 'https://api.subfeed.app',
  headers: {
    'Authorization': `Bearer ${process.env.SUBFEED_API_KEY}`,
    'accept': 'application/json'
  }
});

/**
 * Send a chat message to Subfeed API
 * @param {string} entityId - The entity/workspace ID
 * @param {string} message - The message to send
 * @param {string} sessionId - Optional session ID for conversation continuity
 * @param {string} model - Optional model specification
 * @returns {Promise<Object>} Chat response from Subfeed API
 */
export async function sendChatMessage(entityId, message, sessionId = null, model = null) {
  try {
    const payload = {
      message,
      ...(sessionId && { sessionId }),
      ...(model && { model })
    };
    const response = await subfeedClient.post(
      `/v1/entity/${entityId}/chat`,
      payload
    );
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.error?.message || errorData.message || error.message || 'Unknown error';
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status || 500;
    apiError.apiError = errorData;
    throw apiError;
  }
}

/**
 * List sessions for an entity
 * @param {string} entityId - The entity/workspace ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Results per page (default: 10)
 * @returns {Promise<Object>} Paginated session list
 */
export async function listSessions(entityId, page = 1, limit = 10) {
  try {
    const response = await subfeedClient.get(
      `/v1/entity/${entityId}/session`,
      {
        params: { page, limit }
      }
    );
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.error?.message || errorData.message || error.message || 'Unknown error';
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status || 500;
    apiError.apiError = errorData;
    throw apiError;
  }
}

/**
 * Get chat history for a session
 * @param {string} entityId - The entity/workspace ID
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} Session data with messages
 */
export async function getChatHistory(entityId, sessionId) {
  try {
    const response = await subfeedClient.get(
      `/v1/entity/${entityId}/session/${sessionId}`
    );
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.error?.message || errorData.message || error.message || 'Unknown error';
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status || 500;
    apiError.apiError = errorData;
    throw apiError;
  }
}

/**
 * Clear chat history by deleting a session
 * @param {string} entityId - The entity/workspace ID
 * @param {string} sessionId - The session ID to delete
 * @returns {Promise<Object>} Response from Subfeed API
 */
export async function clearHistory(entityId, sessionId) {
  try {
    const response = await subfeedClient.delete(
      `/v1/entity/${entityId}/session/${sessionId}`
    );
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.error?.message || errorData.message || error.message || 'Unknown error';
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status || 500;
    apiError.apiError = errorData;
    throw apiError;
  }
}

export default subfeedClient;
