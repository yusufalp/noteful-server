const FoldersServices = {
  getAllFolders(knex) {
    return knex.select('*').from('folders')
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.select('*').from('folders').where('id', id).then(rows => {return rows[0]})
  },
  deleteFolder(knex, id) {
    return knex('folders')
      .where({ id })
      .delete()
  },
  updateFolder(knex, id, newFolder) {
    return knex('folders')
      .where({ id })
      .update(newFolder)
  }
}

module.exports = FoldersServices;