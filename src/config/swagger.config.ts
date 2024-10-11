import { DocumentBuilder } from "@nestjs/swagger";

//configuring swagger here
export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Bike Library API Docs')
  .setDescription('API Documentation for the Bike Library with GET, POST, PUT, DELETE methods.')
  .setVersion('1.0')
  .addTag('bikes')
  .build()
