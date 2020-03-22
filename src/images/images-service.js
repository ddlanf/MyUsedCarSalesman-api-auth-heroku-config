const xss = require('xss')

const ImagesService = {
    getAllImages(db){
        return db
            .from('myusedcarsalesman_images as image')
            .select(
                'image.id',
                'image.src',
                'image.alt',
                'image.post_id'
            )      
    },
    getById(db, postId) {
        return ImagesService.getAllImages(db)
          .where('image.post_id', postId)
    },
    insertImage(db, newImage) {
        return db
          .insert(newImage)
          .into('myusedcarsalesman_images')
          .returning('*')
          .then(([image]) => image)
          .then(image =>
            ImagesService.getById(db, image.id)
          )
    },
}


module.exports = ImagesService