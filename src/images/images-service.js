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
    getBySrc(db, src) {
      return ImagesService.getAllImages(db)
        .where('image.src', src)
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
    updateImage(db, updatedImage, post_id){
      return ImagesService.getById(db, post_id)
        .update(updatedImage)
    }
}


module.exports = ImagesService