const multer = require('multer');
const path=require('path');
const crypto=require('crypto');

// Configuramos la ruta de almacenamiento

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../uploads'));
  },
  filename:(req,file,cb)=>{
    const unique=crypto.randomBytes(16).toString('hex');
    const ext=path.extname(file.originalname);
    cb(null,`${unique}${ext}`);
  }
})

// Filtramos el tipo de archivo mediante su mimetype

const fileFilter = (req, file, cb) => { 
  const allowed = ['image/jpeg', 'image/png', 'image/webp']; 
  if (allowed.includes(file.mimetype)){
    cb(null, true); 
  }else {
    cb(new Error('Formato no permitido'), false); 
  }
}; 

module.exports = multer({ 
  storage, fileFilter, limits: { 
    fileSize: 5 * 1024 * 1024 // 5 MB 
  }
});
