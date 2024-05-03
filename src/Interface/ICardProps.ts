export interface CardProps {
    task?:any
    id:number;
    date: string;
    isChecked: boolean;
    text:string;
    status: string;
    onChangeCheckbox: (isChecked: boolean) => void;
    onTimeUpdate: (time: number) => void; 
    onEyeButtonClick:() => void;
    taskId?:string,
    }