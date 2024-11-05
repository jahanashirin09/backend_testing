const db=require("../config/database")
async function get_data(){
    await db.query("SELECT * FROM Details")
}
module.export=get_data();