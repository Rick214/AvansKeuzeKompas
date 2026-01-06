export interface VKMDTO {
    id: number;
    name: string;
    short_description: string;
    description: string;
    content: string;
    credit: number;
    location: string;
    contact_id: number;
    level: string;
    learning_outcomes: string;
    views: number;
    start_date: Date;
    module_tags: Array<string>;
}