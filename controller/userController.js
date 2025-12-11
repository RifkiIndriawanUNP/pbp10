const { json } = require('body-parser')
const userModel = require('../models/userModel')

const getAllBooks = async(req, res) => {
    try{
        const books = await userModel.getAllBooks()
        res.status(200).json({
            msg : "List All Books",
            data : books})
    }
    catch (error){
        res.status(500).json(
            {
                message : "Error Get All Books",
                status : 500
            }
        )
    }
}

const getBookByCode = async(req, res) => {
    try {
        const book= await userModel.getBookByCode(req.params.code);
        if(!book){
            return res.status(404).json(
                {
                    message : "data not found"
                })
        }
        res.json(book)
    } 
    catch (error){
        res.status(500).json({message:error})
    }
}

const addBook = async(req, res) => {
    const {kode, judul, pengarang, penerbit} = req.body
    let isKode = true
    let isJudul = true
    let msg = ""
    if(!kode){
        msg = msg + "Kode wajib diisi"
        isKode= false
    }
    if(!judul){
        msg = msg + "Judul wajib diisi"
        isJudul = false
    }
    if(isKode && isJudul){
        try {
            const affected = await userModel.addBook(req.body)
            if(affected == 1)[
                res.status(200).json({
                    msg : "insert successfull!",
                    data : {...req.body}
                })
            ]
        }
        catch (error){
            res.status(400).json({
                message : error  
            })
        }
    }
    else{
        res.status(400).json({msg:msg})
    }
}

const delBook = async(req,res)=>{
    try{
        const result = await userModel.delBook(req.params.code)
        if(result == 1){
            res.status(200).json({msg:"Delete is Successfull"})
        }
        else{
            res.status(400).json({msg:"Failed"})
        }
    }
    catch(error){
        res.status(400).json({msg:error})
    }
}

const updateBook = async(req,res) => {
    try{
        const id = req.params.id
        const book = req.body
        const result = await userModel.updateBook(id, book)
        if(result == 1){
            res.status(200).json({
                msg : "Update is successull",
                data : book
            })
        }
        else{
            res.status(400).json({msg:"Failed"})
        }
    }
    catch(error){
        res.status(400).json({msg:error})
    }
}
module.exports = {getAllBooks, getBookByCode, addBook, delBook, updateBook}