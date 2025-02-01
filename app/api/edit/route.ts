import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";




export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    // if (origin && !origin.match(/^(https?:\/\/)?(localhost|\bexample\.com\b)/)) { 
    //   return new NextResponse(null, { status: 403 });
    // }
    //Use these if you want to secure the site

    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "يجب أن يكون المحتوى من نوع JSON" },
        { status: 415 }
      );
    }

    const {data , API} = await req.json();
    console.log(data);
    

    const genAI = new GoogleGenerativeAI(API);
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash",});
    
    
    
    const responseSchema = z.object({
      result: z.string(),
      error: z.string().optional(),
    });
    const formattedPoetry = data
    .map((verse: { firstLine: string; secondLine: string; }, index: number) => `البيت ${index + 1}: \n${verse.firstLine}\n${verse.secondLine}`)
    .join("\n\n");
  
  const safePrompt = `
  المهمة: تحسين الشعر العربي مع الحفاظ على الهوية الثقافية.
  المطلوب:
  1. تحسين الأبيات التالية مع التشكيل المناسب.
  2. الحفاظ على القافية والوزن الأصلي.
  3. استخدام لغة فصيحة مع مراعاة البلاغة.
  4. تجنب أي محتوى غير لائق.
  5. قم بتغيير الكلمات او اجعل الشعر افضل جمالا
  
  الشعر المدخل:
  ${formattedPoetry}
  
  الرجاء إعادة صياغة الأبيات بنفس الترتيب كما يلي:
  البيت الأول: محتوى البيت مثلا
  اذا كان هناك بيت ثاني قم باضافته ايضا
  الى ان تنتهي من كل الابيات
  `;

    const result = await model.generateContent(safePrompt);
    const generatedText = await result.response.text();

    const sanitizedText = generatedText
      .replace(/[\<\>\[\]{}()]/g, "")
      .trim();
    return NextResponse.json(responseSchema.parse({ result: sanitizedText }), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": origin || "*",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("API Error:", error instanceof Error ? error.message : "Unknown error");

    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500, headers: { "X-Error": "Internal Server Error" } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}