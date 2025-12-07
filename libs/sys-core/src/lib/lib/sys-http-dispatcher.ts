import axios from 'axios';

export class SysHttpDispatcher {
    public static async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
        const response = await axios.get(url, { headers });
        return response.data;
    }

    public static async post<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    public static async put<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        const response = await axios.put(url, data, { headers });
        return response.data;
    }

    public static async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
        const response = await axios.delete(url, { headers });
        return response.data;
    }

    public static async patch<T>(url: string, data: unknown, headers?: Record<string, string>): Promise<T> {
        const response = await axios.patch(url, data, { headers });
        return response.data;
    }
}