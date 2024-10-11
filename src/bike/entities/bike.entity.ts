export class Bike {
  id: string;
  make: string;
  model: string;
  year: number;
  type: 'CRUISER' | 'SPORT' | 'ADVENTURE' | 'TOURING' | 'DIRT' | 'STANDARD';
}
//  A simple classs which is used to cast the response to this structure before sending to client. This is used in the private mapToBike method in BikeService file
