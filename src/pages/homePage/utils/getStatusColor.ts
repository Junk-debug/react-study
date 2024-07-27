import { Character } from "../../../api/types";

export default function getStatusColor(status: Character["status"]) {
  switch (status) {
    case "Alive":
      return "text-green-500";
    case "Dead":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}
