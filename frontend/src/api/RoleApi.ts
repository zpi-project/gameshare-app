import { Role } from "@/types/Role";
import Api from "./Api";

export class RoleApi {
  static async getRole() {
    const { data: role } = await Api.get<{ name: Role }>("/role");
    return role;
  }
}
