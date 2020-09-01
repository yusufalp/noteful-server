const NotesServices = {
  getAllNotes(knex) {
    return knex.select('*').from('notes')
  },
  insertNotes(knex, newNote) {
    return knex
      .insert(newNote)
      .into('notes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('notes').select('*').where('id', id)
  },
  deleteNote(knex, id) {
    return knex('notes')
      .where({ id })
      .delete()
  },
  updateNotes(knex, id, newNote) {
    return knex('notes')
      .where({ id })
      .update(newNote)
  }
}

module.exports = NotesServices;