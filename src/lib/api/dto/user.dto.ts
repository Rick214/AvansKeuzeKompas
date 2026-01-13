import type { ChosenModule } from '$lib/models/chosenModule.model';

export type UserDto = {
	fullName: string;
	email: string;
	studentnumber: string;
	isStudent: boolean;
	favoriteVKMs: number[];
	enrolledVKMs: ChosenModule[];
	aiRecommendedVKMs: number[];
	token: string;
	dob: Date;
	fontsize: number;
	darkmode: string;
	language: string;
	notifications: boolean;
	course: string;
	SLBer: string;
};
