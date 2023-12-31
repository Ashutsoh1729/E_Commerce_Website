'use client'
import { Copy, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import { toast } from "react-hot-toast"




interface ApiAlertProps{
    title: string,
    description: string,
    variant: "public" | "admin"
}



const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}


export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {
    
    function onCopy(description: string) {
        navigator.clipboard.writeText(description)
        toast.success("API data copied to clipboard.")
    }

    return (
    <>
        <Alert>
            <Server className=" h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className=" flex items-center justify-between mt-4">
                <code className="relative rounded bg-muted font-mono text-sm font-semibold py-[0.2rem]">
                    {description}
                </code>
                <Button className="relative" variant={"outline"} onClick={()=> onCopy(description)}>
                    <Copy className=" h-4 w-4" />
                </Button>
            </AlertDescription>

        </Alert>
    </>
) 


}

















