const NotesServices = {
  getAllNotes(knex) {
    return knex.select('*').from('notes')
  },
  insertNote(knex, newNote) {
    return knex
      .insert(newNote)
      .into('notes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('notes').select('*').where('id', id).then(rows=> {return rows[0]})
  },
  deleteNote(knex, id) {
    return knex('notes')
      .where({ id })
      .delete()
  },
  updateNote(knex, id, newNote) {
    return knex('notes')
      .where({ id })
      .update(newNote)
  }
}

module.exports = NotesServices;