import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Use configuration from `conf`
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account created:", userAccount);

            if (userAccount) {
                // Automatically log the user in if account creation is successful
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error.message);
            throw new Error(`Account creation failed: ${error.message}`);
        }
    }

    // Login user
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful, session:", session);
            return session;
        } catch (error) {
            console.error("AuthService :: login :: error", error.message);
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    // Get current user details
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error.message);
            return null;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("AuthService :: logout :: error", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
