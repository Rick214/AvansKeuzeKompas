import { apiClient } from './apiClient';

export async function submitEnquete(answers: any, token: string) {
	return apiClient('/recommendations', token, {
		method: 'POST',
		body: answers
	});
}

export async function wakeAiModel(token: string) {
	return apiClient('/recommendations/ready', token, {
		method: 'GET'
	});
}
