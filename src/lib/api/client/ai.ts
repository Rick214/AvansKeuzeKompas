import { apiClient } from './apiClient';

export async function submitEnquete(answers: any) {
    return apiClient('/recommendations', {
        method: 'POST',
        body: answers
    });
}