'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    value: string[],

}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])



    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }



    if (!mounted) {
        return null;
    }

    return (
        <div>
            <div className=" flex items-center gap-4">
                {value.map((url: any) => { 
                    return (
                        <div key={url} className='mb-4 relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                            <div className=' absolute z-10 top-2 right-2'>
                                <Button className='' type='button' onClick={()=>{onRemove(url)}} variant={"destructive"}>
                                    <Trash className=' h-4 w-4'/>
                                </Button>
                            </div>
                            <Image
                                fill
                                alt='Image '
                                src={url}
                            />
                        </div>
                    )
                })}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset='mn6glvbr'>
                {({ open }) => {
                    const onClick = () => { 
                        open();
                    }
                    return (
                        <Button
                            type='button'
                            variant={"secondary"}
                            disabled={disabled}
                            onClick={onClick}
                        >
                            <ImagePlus className=' h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload