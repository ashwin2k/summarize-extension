import axios, {
    AxiosInstance,
    AxiosResponse,
} from 'axios';
const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.jigsawstack.com',
    timeout: 20000, // 20 seconds timeout
    headers: {
        'x-api-key': process.env.JIGSAWSTACK_API_KEY,
    },
});

export async function summarize({ content }: { content: String }) {
    const requestBody = {
        text: content,
    };
    try {
        const response: AxiosResponse = await apiClient.post(
            '/v1/ai/summary',
            requestBody,
        );
        return response.data;
    } catch (error) {
        return {
            status: 500,
            success: false,
            errors: ['Internal Server Error'],
        };
    }
}
