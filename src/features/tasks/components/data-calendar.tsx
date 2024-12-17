import {
	format,
	getDay,
	parse,
	startOfWeek,
	addMonths,
	subMonths,
} from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Task, TaskStatus } from "../types";
import { useState } from "react";
import "./data-calendar.css";
import { EventCard } from "./event-card";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const locales = {
	"zh-CN": zhCN,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
// const messages = {
// 	today: "今天",
// 	previous: "上一月",
// 	next: "下一月",
// };
interface DataCalendarProps {
	data: Task[];
}

interface CustomToolbarProps {
	date: Date;
	onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
	return (
		<div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
			<Button
				onClick={() => onNavigate("PREV")}
				variant="outline"
				size="icon"
				className="flex items-center"
			>
				<ChevronLeftIcon className="" />
			</Button>
			<div className="flex items-center justify-center border border-input rounded-md px-3 py-2 h-8 w-full lg:w-auto">
				<CalendarIcon className="size-4 mr-2" />
				<p className="text-sm">{format(date, "yyyy MMMM", { locale: zhCN })}</p>
			</div>
			<Button
				onClick={() => onNavigate("NEXT")}
				variant="outline"
				size="icon"
				className="flex items-center"
			>
				<ChevronRightIcon className="size-4" />
			</Button>
		</div>
	);
};

export const DataCalendar = ({ data }: DataCalendarProps) => {
	const [value, setValue] = useState(
		data.length > 0 ? new Date(data[0].dueDate) : new Date()
	);

	const events = data.map(task => ({
		start: new Date(task.dueDate),
		end: new Date(task.dueDate),
		title: task.name,
		project: task.project,
		assignee: task.assignee,
		status: task.status,
		id: task.$id,
	}));

	const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
		if (action === "PREV") {
			setValue(subMonths(value, 1));
		} else if (action === "NEXT") {
			setValue(addMonths(value, 1));
		} else if (action == "TODAY") {
			setValue(new Date());
		}
	};

	return (
		<Calendar
			localizer={localizer}
			events={events}
			date={value}
			views={["month"]}
			defaultView="month"
			toolbar
			showAllEvents
			className="h-full"
			max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
			formats={{
				weekdayFormat: (date, culture, localizer) =>
					localizer?.format(date, "EEE", "zh-CN") ?? "",
				// monthHeaderFormat: (date, culture, localizer) =>
				// 	localizer?.format(date, "yyyy MMMM", "zh-CN") ?? "",
			}}
			// messages={messages}
			components={{
				eventWrapper: ({ event }) => (
					<EventCard
						id={event.id}
						title={event.title}
						assignee={event.assignee}
						project={event.project}
						status={event.status}
					/>
				),
				toolbar: () => (
					<CustomToolbar date={value} onNavigate={handleNavigate} />
				),
			}}
		/>
	);
};
