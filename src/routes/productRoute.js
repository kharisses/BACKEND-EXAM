const router = require ('express').Router()
const conn = require ('../config/db')
const bcrypt = require('bcrypt')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

router.post('/register', (req,res)=>{
    
    const sql = 'insert into products set ?'
    const data = req.body

    conn.query(sql, data, (err, result)=>{

        if(err) return res.status(500).send(err)
        res.status(200).send({
            message: "register berhasil"
        })
    })
})

const upload = multer({
    limits: {
        fileSize: 100000000 // Byte , default 1MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
            return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
        }
 
        cb(undefined, true)
    }
 })
 
 const filesDirectory = path.join(__dirname, '../files')
 
 
 router.post('/products/image', upload.single('image'), async (req, res) => {
 
    try {
       
       const fileName = `${req.body.name}-image.png`
       const sql = `UPDATE products SET image = ? WHERE name = ?`
       const data = [fileName, req.body.name]
 
      
       await sharp(req.file.buffer).resize(300).png().toFile(`${filesDirectory}/${fileName}`)
 
       conn.query(sql, data, (err, result) => {
          
          if(err) return res.status(500).send(err)
 
         
          res.status(201).send({ message: 'Berhasil di upload' })
       })
 
       
    } catch (err) {
       res.status(500).send(err.message)
    }
 
 }, (err, req, res, next) => {
    
    res.send(err)
 })

 router.get('/products/:product_id', (req,res)=>{
    const sql = 'select * from products where product_id = ?'
    const data = req.params.product_id

    conn.query(sql,data, (err,result)=>{
        if (err) return res.status(500).send(err)

        res.status(200).send(result)
    })
})

router.patch('/products/:product_id',  (req, res) => {
    const sql = 'UPDATE products SET ? WHERE product_id = ? '
    const data = [req.body, req.params.product_id]
   
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })
 
 router.delete('/products/:product_id', (req, res) => {
    const sql = `DELETE FROM products WHERE product_id = ?`
    const data = req.params.product_id
 
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err.sqlMessage)
 
       res.send({
          message: "Product berhasil di hapus"
       })
    })
 })
 

module.exports = router