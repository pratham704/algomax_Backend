import { getConnection } from "../config/database.js";
import { createStudentTable } from "./student.service.js";

async function deleteTable() {
    try {
        const connection = await getConnection();

        const ans = await connection.execute("drop table students");

        console.log(ans);
    } catch (error) {
        console.log(error);
    }
}

const createStudentTables = async() => {
    try {
        const ans = await createStudentTable();

        console.log(ans);
    } catch (error) {
        console.log(error);
    }
};


// deleteTable()

// createStudentTables()