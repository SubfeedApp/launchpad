import axios from 'axios';

const subfeedClient = axios.create({
  baseURL: process.env.SUBFEED_API_URL || 'https://api.subfeed.app',
  headers: {
    'Authorization': `Bearer ${process.env.SUBFEED_API_KEY}`,
    'accept': 'application/json'
  }
});

/**
 * Perform a web search via Subfeed API
 * @param {string} entityId - The entity/workspace ID
 * @param {Object} searchParams - Search parameters object
 * @param {string} searchParams.query - Search query string
 * @param {number} [searchParams.max_results=5] - Maximum number of results
 * @param {boolean} [searchParams.include_answer=true] - Include answer in response
 * @param {string} [searchParams.time_range='month'] - Time range for results (e.g., 'week', 'month', 'year')
 * @param {string} [searchParams.topic='general'] - Topic category for search
 * @param {string} [searchParams.search_depth='basic'] - Search depth level ('basic' or 'advanced')
 * @returns {Promise<Object>} Web search results from Subfeed API
 */
export async function performWebSearch(entityId, searchParams) {
  try {
    const payload = {
      params: searchParams
    };
    const response = await subfeedClient.post(
      `/v1/entity/${entityId}/actions/web_search`,
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

export default subfeedClient;
