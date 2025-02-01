"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type Verse = {
  firstLine: string;
  secondLine: string;
};

const Submit = () => {
  const [verses, setVerses] = useState<Verse[]>([{ firstLine: "", secondLine: "" }]);
  const [savedVerses, setSavedVerses] = useState<Verse[]>([]);
  const [aiContent, setAIContent] = useState("");

  useEffect(() => {
    const storedVerses = JSON.parse(localStorage.getItem("savedVerses") || "[]") as Verse[];
    setSavedVerses(storedVerses);
  }, []);

  const handleInputChange = (index: number, field: keyof Verse, value: string) => {
    setVerses((prevVerses) => {
      const newVerses = [...prevVerses];
      newVerses[index][field] = value;
      return newVerses;
    });
  };

  const addVerse = () => {
    setVerses((prevVerses) => [...prevVerses, { firstLine: "", secondLine: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("savedVerses", JSON.stringify(verses));
    setSavedVerses(verses);
  };

  const handleAI = async (e: React.FormEvent) => {
    e.preventDefault();
    const API = localStorage.getItem("API");

    if (!API) {
      toast.error("يرجى اضافة مفتاح واجهة برمجة التطبيقات لبدء استخدام الذكاء الاصطناعي");
      return;
    }

    try {
      const response = await axios.post("/api/edit", { data: verses, API }, {
        headers: { "Content-Type": "application/json" },
      });
      setAIContent(response.data.result);
      toast.success("تم الاتصال بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء الاتصال");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {verses.map((verse, index) => (
          <div key={index} className="flex gap-4">
            <Input
              type="text"
              placeholder="الشطر الأول"
              value={verse.firstLine}
              onChange={(e) => handleInputChange(index, "firstLine", e.target.value)}
              className="flex-1 text-right"
            />
            <Input
              type="text"
              placeholder="الشطر الثاني"
              value={verse.secondLine}
              onChange={(e) => handleInputChange(index, "secondLine", e.target.value)}
              className="flex-1 text-right"
            />
          </div>
        ))}
        <div className="flex gap-4">
          <Button type="button" onClick={addVerse} className="flex-1">
            إضافة بيت جديد
          </Button>
          <Button type="submit" className="flex-1">
            حفظ التغييرات
          </Button>
        </div>
      </form>

      <Card className="w-full mt-5">
        <CardHeader>
          <CardTitle>الشعر المُنسّق</CardTitle>
        </CardHeader>
        <CardContent>
          {savedVerses.length > 0 ? (
            <div className="space-y-4 font-arabic text-2xl text-right">
              {savedVerses.map((verse, index) => (
                <div key={index} className="p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="ar text-primary">{verse.firstLine}</span>
                    <span className="mx-2">..</span>
                    <span className="ar text-primary">{verse.secondLine}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">لا يوجد شعر مُنسّق</p>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={handleAI}>
            التنسيق بالذكاء الاصطناعي
          </Button>
        </CardFooter>
      </Card>

      {aiContent && (
        <Card className="w-full mt-5">
          <CardHeader>
            <CardTitle>النتيجة من الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent className="w-1/2">
            <ReactMarkdown className="prose prose-lg text-right ar">{aiContent}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Submit;
