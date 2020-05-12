const router = require ('express').Router()
const conn = require ('../config/db')
const bcrypt = require('bcrypt')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

router.post('/registerStore', (req,res)=>{
    
    const sql = 'insert into stores set ?'
    const data = req.body

    conn.query(sql, data, (err, result)=>{

        if(err) return res.status(500).send(err)
        res.status(200).send({
            message: "register berhasil"
        })
    })
})

router.get('/stores/:store_id', (req,res)=>{
    const sql = 'select * from stores where store_id = ?'
    const data = req.params.store_id

    conn.query(sql,data, (err,result)=>{
        if (err) return res.status(500).send(err)

        res.status(200).send(result)
    })
})

router.patch('/stores/:store_id',  (req, res) => {
    const sql = 'UPDATE stores SET ? WHERE store_id = ? '
    const data = [req.body, req.params.store_id]
   
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })

 router.delete('/stores/:store_id', (req, res) => {
    const sql = `DELETE FROM stores WHERE store_id = ?`
    const data = req.params.store_id
 
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err.sqlMessage)
 
       res.send({
          message: "Product berhasil di hapus"
       })
    })
 })

module.exports = router