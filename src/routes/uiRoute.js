const router = require ('express').Router()
const conn = require ('../config/db')
const bcrypt = require('bcrypt')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')


router.get('/showRoute', (req,res)=>{
    
    const sql = 'SELECT i.inventory_id, p.name, s.branch_name, i.inventory FROM inventory i JOIN products p ON i.product_id = p.product_id JOIN stores s ON i.store_id = s.store_id;'

    conn.query(sql, data, (err, result)=>{

        if(err) return res.status(500).send(err)
        res.status(200).send(result)
    })
})

router.patch('/route/:inventory_id',  (req, res) => {
    const sql = 'UPDATE inventory SET ? WHERE inventory_id = ? '
    const data = [req.body, req.params.inventory_id]
   
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })

router.delete('/route/:inventory_id', (req, res) => {
    const sql = `DELETE FROM inventory WHERE inventory_id = ?`
    const data = req.params.inventory_id
 
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err.sqlMessage)
 
       res.send({
          message: "Inventory berhasil di hapus"
       })
    })
 })



module.exports = router