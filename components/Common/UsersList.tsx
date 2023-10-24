import api from "@/pages/api";
import { useEffect, useState } from "react";
import TypingAnimation from "../Modals/common/TypingAnimation";
import SlideBottom from "../Animated/SlideBottom";

const UsersList = () => {
    const [employees, setEmployees] = useState<Array<any>>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const workspace = localStorage.getItem("workspace");
        const fetchEmployees = async () => {
            try {
                const { data } = await api.get(`/workspace/${workspace}`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                });
                setEmployees(data.employees);
                setLoadingUsers(false);
            } catch (e) {
                console.log(e);
                setLoadingUsers(false);
            }
        }
        fetchEmployees();
    }, []);

        return (
            <div className="flex items-center">
                {employees.slice(0, 3).map((employee, index) => (
                    <SlideBottom key={index}>
                    <div className="rounded-full border-2 border-white bg-slate-200 w-8 h-8 flex justify-center items-center shadow-sm relative -ml-3">
                        <p className="font-medium text-white">{employee.name.substring(0, 1)}</p>
                    </div>
                    </SlideBottom>
                ))}
                {employees.length > 3 && (
                    <SlideBottom><span className="ml-2 text-black text-sm font-medium py-1">{`+${employees.length - 3}`}</span></SlideBottom>
                )}
            </div>
        );


}

export default UsersList;
