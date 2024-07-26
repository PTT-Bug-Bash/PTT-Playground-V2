import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

    return knex.schema.table("campaigns", (table) => {
     table.string("title");
     table.string("athelete_qualification");
     table.string("campaign_status");
     table.string("comments");
    })

    .createTable("campaigns_repeat", (table) => {
      table.increments("id").primary();
      table.integer("campaign_id");
      table.dateTime("start");
      table.dateTime("end");
      table.foreign("campaign_id").references("campaigns.id").onDelete("CASCADE");
    
      
  })

    .createTable("notes_history", (table) => {
            table.increments("id").primary();
            table.string("notes").unsigned().notNullable();
            table.dateTime("timestamp");
        })

    .createTable("admin_notes", (table) => {
            table.integer("note_id").notNullable;
            table.integer("business_id");
            table.integer("athlete_id");
            table.string("notes_summary");
            table.dateTime("timestamp");
            table.foreign("note_id").references("notes_history.id").onDelete("CASCADE");
            table.foreign("business_id").references("businesses.id").onDelete("CASCADE");
            table.foreign("athlete_id").references("athletes.id").onDelete("CASCADE");
              
            })
          
          
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("admin_notes").dropTableIfExists("notes_history").dropTableIfExists("campaings_repeat");
}
