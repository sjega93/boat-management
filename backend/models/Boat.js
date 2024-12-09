import mongoose from "mongoose";
import  {SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";

//retrieve mongoUri from AWS SSM parameter Store
let ssmClient = new SSMClient({
  region: 'eu-central-1'
})
const input = { 
  Name: "mongoUri", 
  WithDecryption: false,
};
const command = new GetParameterCommand(input);
const response = await ssmClient.send(command);

mongoose.connect(response.Parameter.Value);
const boatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  year: { type: String, required: true },
  location: { type: String, required: true },
  value: { type: Number, required: true },
  }
);

const Boat= mongoose.model('BoatList', boatSchema);

export default Boat;