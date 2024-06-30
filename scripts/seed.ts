import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([{ id:1, title:"Korean", imageSrc:"/korea.png" }]);
        await db.insert(schema.courses).values([{ id:2, title:"Japanese", imageSrc:"/japan.png" }]);
        await db.insert(schema.courses).values([{ id:3, title:"French", imageSrc:"/france.png" }]);
        await db.insert(schema.courses).values([{ id:4, title:"Spanish", imageSrc:"/spain.png" }]);

        console.log("Seeding finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
};

main();
