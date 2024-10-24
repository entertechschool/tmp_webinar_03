// import ai from "@/lib/ai";

export async function POST(request: Request) {
    const { rawNote } = await request.json();
    const summarizeNote = "Esta es tu nota resumida: " + rawNote;
    // const completion = await ai.summarizeNote(rawNote);
    // const summarizeNote = completion.choices[0].message.content;
    return Response.json({data: summarizeNote});

    // const completion = await ai.summarizeNote(rawNote);
    // console.log(completion.choices[0].message);

}