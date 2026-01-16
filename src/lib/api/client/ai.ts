import { apiClient } from './apiClient';

export async function submitEnquete(answers: any) {
	return apiClient('/recommendations', {
		method: 'POST',
		body: answers
	});
}

export async function wakeAiModel() {
	return apiClient('/recommendations/ready', {
		method: 'GET'
	});
}
