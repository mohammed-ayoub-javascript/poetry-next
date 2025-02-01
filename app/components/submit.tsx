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

const FORBIDDEN_CHARS = new Set([" ", "ا", "أ", "إ", "آ", "ى", "و", "ة", "ه"]);

const Submit = () => {
  const [verses, setVerses] = useState<Verse[]>([{ firstLine: "", secondLine: "" }]);
  const [savedVerses, setSavedVerses] = useState<Verse[]>([]);
  const [aiContent, setAIContent] = useState("");

  useEffect(() => {
    const storedVerses = JSON.parse(localStorage.getItem("savedVerses") || "[]") as Verse[];
    setSavedVerses(storedVerses);
  }, []);

  const handleInputChange = (index: number, field: keyof Verse, value: string) => {
    const newVerses = [...verses];
    newVerses[index][field] = value;
    setVerses(newVerses);
  };

  const addVerse = () => {
    setVerses([...verses, { firstLine: "", secondLine: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("savedVerses", JSON.stringify(verses));
    setSavedVerses(verses);
  };

  const handelAI = (e: React.FormEvent) => {
    e.preventDefault();

    const sendtoAPI = axios
      .post(
        "/api/edit",
        { data: verses },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        setAIContent(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    toast.promise(sendtoAPI, {
      loading: "يرجى الانتظار...",
      success: <b>تم الاتصال</b>,
      error: <b>حدث خطأ</b>,
    });
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
            حفظ الشعر
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
          <Button className="w-full" variant={"outline"} onClick={handelAI}>
            التنسيق بالذكاء الاصطناعي
          </Button>
        </CardFooter>
      </Card>

      {aiContent && (
        <Card className="w-full mt-5">
          <CardHeader>
            <CardTitle>النتيجة من الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent className=" w-1/2">
            <ReactMarkdown className="prose prose-lg text-right ar" children={aiContent} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Submit;
