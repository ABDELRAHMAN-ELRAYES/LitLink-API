import { Module } from "@nestjs/common";
import { MailService } from "./email.service";

@Module({
    imports:[],
    providers:[MailService],
    exports:[MailService]
})

export class MailModule{}