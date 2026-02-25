import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Clock2Icon } from "lucide-react"

interface CalendarWithTimeProps {
    date?: Date;
    onDateChange?: (date: Date | undefined) => void;
    time?: string;
    onTimeChange?: (time: string) => void;
}

function CalendarWithTime({ date, onDateChange, time, onTimeChange }: CalendarWithTimeProps) {
    return (
        <Card className="mx-auto w-fit">
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    className="p-0"
                />
            </CardContent>
            <CardFooter className="bg-card border-t">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="time">Time</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => onTimeChange?.(e.target.value)}
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                            <InputGroupAddon>
                                <Clock2Icon className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </FieldGroup>
            </CardFooter>
        </Card>
    )
}

export default CalendarWithTime;
