import React from "react";
import { EditIcon } from "./Icons";


export default function EmailReceipt() {
    return(
    <div className="mb-6">
        <div className="mb-2 flex justify-between items-center gap-2">
            <p className="font-medium">Recibos por email</p>
            <EditIcon className="text-blue-600 w-5 h-5 mt-1"/>
        </div>
        <p className="font-sm">eduarda@gmail.com</p>
    </div>
    );
}