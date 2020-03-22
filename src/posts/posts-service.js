const xss = require('xss')

const PostsService = {
    getAllPosts(db){
        return db
            .from('myusedcarsalesman_posts as post')
            .select(
                'post.id',
                'post.make',
                'post.model',
                'post.year',
                'post.mileage',
                'post.description',
                'post.commission_amount',
                'post.location',
                'post.price',
                'post.other_terms_and_conditions',
                'post.date_created',
                'user.user_name'
            )      
            .innerJoin('myusedcarsalesman_users as user', 'post.user_id', 'user.id')
    },
    getById(db, id) {
        return PostsService.getAllPosts(db)
          .where('post.id', id)
          .first()
    },
    insertPost(db, newPost) {
        return db
          .insert(newPost)
          .into('myusedcarsalesman_posts')
          .returning('*')
          .then(([post]) => post)
          .then(post =>
            PostsService.getById(db, post.id)
          )
    },
    updatePost(db, updatedPost, id){
        return PostsService.getById(db, id)
          .update(updatedPost)
    }
}

module.exports = PostsService