export const BikeSwaggerSchema = {
  type: 'object',
  properties: {
    make: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
    type: {
      type: 'string',
      enum: ['CRUISER', 'SPORT', 'ADVENTURE', 'TOURING', 'DIRT', 'STANDARD'],
    },
  },
  required: ['make', 'model', 'year', 'type'], // defining that all these four properties are required.
}
// This is the schema for the POST/PATCH request in bike library API.
// The data sent from SwaggerUI will be parsed according to this schema.
