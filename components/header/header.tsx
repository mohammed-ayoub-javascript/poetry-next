import React from 'react'
import { Button } from '../ui/button'
import { Code, FileText, Github } from 'lucide-react'
import { ModeToggle } from '../theme/mode-toggle'
import Link from 'next/link'

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
            <Button variant={"outline"}>
                <FileText />
            </Button>
        </div>
    </div>
  )
}

export default Header