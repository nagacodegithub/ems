const seedUser = require("../seeders/admin-seeders");
const seedAdmin = require("../seeders/user-seeders");


async function run() {
    try {
        await seedAdmin();
        console.log("Admin seeding successfully");
    } catch (error) {
         console.log("seeding failed", error);
         process.exit(1);
    }

     try {
      
       await seedUser();
       console.log("user seeding successfully");

     } catch (error) {
       console.log("user seeding failed", error);
       process.exit(1);
    }
    
    process.exit(0);
}
 run();