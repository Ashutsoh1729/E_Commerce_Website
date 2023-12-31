"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { cn } from "@/lib/utils"
// import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        id: "color",
        cell: ({ row }) => <div className={cn(` w-8 h-8`,`bg-[${row.original.value}]` ) }></div>
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },

]
