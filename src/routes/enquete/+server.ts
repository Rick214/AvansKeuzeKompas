import { submitEnquete, wakeAiModel } from "$lib/api/client/ai";
import { json, type RequestEvent } from "@sveltejs/kit";

export const GET = async ({ cookies }: RequestEvent): Promise<Response> => {
    // Token stays HttpOnly
    const token = cookies.get('auth') ?? "";    

    await wakeAiModel(token);

    return json({ ok: true });
};

export const POST = async ({ request, cookies }: RequestEvent): Promise<Response> => {
    const answerList = await request.json();

    // Token stays HttpOnly
    const token = cookies.get('auth') ?? "";    

    await submitEnquete(answerList, token);

    return json({ ok: true });
}
