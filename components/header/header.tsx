import React from 'react'
import { Button } from '../ui/button'
import { Code, FileText, Github } from 'lucide-react'
import { ModeToggle } from '../theme/mode-toggle'

const Header = () => {
  return (
    <div className=' w-full flex justify-between items-center flex-row border p-3 mb-5'>
        <div className=' text-2xl font-bold ar'>
            الشاعر الحديث
        </div>
        <div className=' flex justify-center items-center flex-row gap-3'>
            <Button variant={"outline"}>
                <Github />
            </Button>
            <ModeToggle />
            <Button variant={"outline"}>
                <FileText />
            </Button>
        </div>
    </div>
  )
}

export default Header