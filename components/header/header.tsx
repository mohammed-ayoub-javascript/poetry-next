import React from 'react'
import { Button } from '../ui/button'
import {  Code2, Github} from 'lucide-react'
import { ModeToggle } from '../theme/mode-toggle'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import SaveApiKey from './client/save-api-key'
  
const Header = () => {
  const githubLink = "https://github.com/mohammed-ayoub-javascript/poetry-next"
  return (
    <div className=' w-full flex justify-between items-center flex-row border p-3 mb-5'>
        <div className=' text-2xl font-bold ar'>
            الشاعر الحديث
        </div>
        <div className=' flex justify-center items-center flex-row gap-3'>
            <Link target="_blank" href={githubLink}>
            <Button variant={"outline"}>
                <Github />
            </Button>            
            </Link>

            <ModeToggle />
            <AlertDialog>
  <AlertDialogTrigger>
            <Button variant={"outline"}>
                <Code2 />
            </Button>    
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>API</AlertDialogTitle>
      <AlertDialogDescription>
        <p>      For unlimited use, you can create an API key in Gemini API, then copy and paste it into the input field below. It will be saved locally on your device. If you need additional usage, you can generate a new API key again
        </p>
        <SaveApiKey />
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className=' w-full'>
    <AlertDialogCancel className=' w-full' >
        <p className=' text-red-500'>Close</p>
      </AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        </div>
    </div>
  )
}

export default Header