const db = require('../config/db')

//async - await => menunggu jika jaringan lambat untuk mengakses database
const getAllBooks = async () => {
    const [rows] = await db.query("select * from buku")
    return rows
}

const getBookByCode = async(code) => {
    const [row] = await db.query("select * from buku where kode_buku=?", [code])
    return row[0]
}

const addBook = async(book) => {
    const {kode, judul, pengarang, penerbit} = book
    const query = "insert into buku" + "(kode_buku,judul,pengarang,penerbit)" + "values (?,?,?,?)"
    const affected = await db.query(query, [kode, judul, pengarang, penerbit])
    return affected[0].affectedRows
}

const delBook = async(id)=>{
    const aff = await db.query("Delete from buku where kode_buku=?", [id])
    return aff[0].affectedRows
}

const updateBook = async(id, book) => {
    const {judul, pengarang, penerbit} = book
    const query = "update buku set judul=?,pengarang=?,penerbit=? where id=?"
    const result = await db.query(query, [judul, pengarang, penerbit,id])
    return result[0].affectedRows
    
}

module.exports = {getAllBooks, getBookByCode, addBook,delBook, updateBook}