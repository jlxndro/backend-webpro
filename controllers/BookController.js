import Book from "../models/BookModel.js";
import path from "path";
import fs from "fs";

export const getBooks = async(req, res)=>{
    try {
        const response = await Book.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBookById = async(req, res)=>{
    try {
        const response = await Book.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createBook = (req, res)=>{
   if(req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
   const { title, author, publisher, published, synopsis, categoryId } = req.body;
   const file = req.files.file;
   const fileSize = file.data.length;
   const ext = path.extname(file.name);
   const fileName = file.md5 + ext;
   const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
   const allowedType = [".png", ".jpg", ".jpeg"];

   if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
   if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

   file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Book.create({
        title: title,
        author: author,
        publisher: publisher,
        published: published,
        synopsis: synopsis,
        image: fileName,
        url: url,
        categoryId: categoryId,
      });
      res.status(201).json({ msg: "Book Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
    });
}

export const updateBook = async(req, res)=>{
    const book = await Book.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!book) return res.status(404).json({ msg: "No Data Found" });
    
      let fileName = "";
      if (req.files === null) {
        fileName = book.image;
      } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];
    
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });
    
        const filepath = `./public/images/${book.image}`;
        fs.unlinkSync(filepath);
    
        file.mv(`./public/images/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
      const { title, author, publisher, published, synopsis, categoryId } = req.body;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
      try {
        await Book.update(
          { title: title,
            author: author,
            publisher: publisher,
            published: published,
            synopsis: synopsis,
            image: fileName,
            url: url,
            categoryId: categoryId },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({ msg: "Book Updated Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
}

export const deleteBook = async(req, res)=>{
    const book = await Book.findOne({
        where: {
          id: req.params.id
        },
      });
      if (!book) return res.status(404).json({ msg: "No Data Found" });
    
      try {
        const filepath = `./public/images/${book.image}`;
        fs.unlinkSync(filepath);
        await Book.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({ msg: "Book Deleted Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
}

export const getNovel = async (req, res) => {
    try {
      const response = await Book.findAll({
        where: {
          categoryId: 1
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
}

export const getComic = async (req, res) => {
    try {
      const response = await Book.findAll({
        where: {
          categoryId: 2
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
}

export const getBiography = async (req, res) => {
    try {
      const response = await Book.findAll({
        where: {
          categoryId: 3
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
}

export const getEducation = async (req, res) => {
    try {
      const response = await Book.findAll({
        where: {
          categoryId: 4
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
}
