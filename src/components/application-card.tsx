import type {Application} from "@/api/types.ts";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

type ApplicationCardProps = {
    application: Application;
}

function ApplicationCard({application}: ApplicationCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {application.title} - {application.company.name}
                </CardTitle>
                <p>Status: {application.status}</p>
            </CardHeader>
            <CardContent>
                <ScrollArea className={"border rounded-md p-2 h-45"}>
                    {application.description}
                </ScrollArea>
            </CardContent>
            <CardAction className={"mx-5"}>
                <Link to={"/applications/$applicationId"} params={{applicationId: application.id}}>
                    <Button>
                        View Details
                    </Button>
                </Link>
            </CardAction>
        </Card>
    );
}

export default ApplicationCard;