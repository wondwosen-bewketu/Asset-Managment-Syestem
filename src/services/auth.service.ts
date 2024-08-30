// Import the database connection from the "../config/database" file
import { db } from "../config/database";

// Import the bcrypt library for password hashing
import bcrypt from 'bcryptjs'

// Import the signToken function from the "../utils/jwt" file
import { signToken } from "../utils/jwt";

// Import the v4 function from the uuid library and rename it to uuidv4
import {v4 as uuidv4} from 'uuid'

// Define a class named AuthService
export class AuthService {
    // Define an asynchronous method named register that takes email and password as parameters and returns a Promise of string
    async register(email:string,password:string): Promise<string> {
        // Hash the password using bcrypt with a salt round of 10
        const hashedPassword = await bcrypt.hash(password,10);
        
        // Generate a new UUID (Universally Unique Identifier)
        const id = uuidv4();
        
        // Insert a new user into the 'users' table in the database
        const user = await db
        .insertInto('users')
        .values({id,email,password:hashedPassword})
        .returning('id')
        .executeTakeFirst();

        // If user creation fails, throw an error
        if(!user){
            throw new Error('Failed to create User');
        }

        // If user creation is successful, sign and return a token
        return signToken(user.id);
    }

    // Define an asynchronous method named login that takes email and password as parameters and returns a Promise of string
    async login(email:string,password:string): Promise<string> {
        // Query the database to find a user with the given email
        const user = await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();

        // If no user is found or the password doesn't match, throw an error
        if (!user || !(await bcrypt.compare(password,user.password))){
            throw new Error('Invalid Credentials');
        }
        
        // If login is successful, sign and return a token
        return signToken(user.id)
    }
}