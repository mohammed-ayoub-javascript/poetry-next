"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

const SaveApiKey = () => {
  const [api , setAPI] = useState("");

  const handelChangeAPI = () => {
    if(api == ""){
        toast.error("لا يمكن ترك الحقل فارغا");

        return 0;
    }
    localStorage.setItem("API" , api);

    toast.success("تم الحفظ")
  }
  return (
    <div className=" w-full mt-2 mb-2">
        <Input className=" w-full" placeholder="API KEY" onChange={(e) => {
            setAPI(e.target.value)
        }}/>
        <Button className=" mt-2 w-full" onClick={handelChangeAPI}>
            Save
        </Button>
    </div>
  )
}

export default SaveApiKey