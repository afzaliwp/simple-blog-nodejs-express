const usersModel = require('@models/users');
class Post {
    async create(request) {
        const authors = await usersModel.getAllAuthors(['ID']);
        const authorIDs = [];
        authors.forEach(author => {
            authorIDs.push(`${author.ID}`)
        });
        console.log(authorIDs);
        console.log(request.author_id);
        console.log(authorIDs.includes(request.author_id));
        //errors
        const errors = [];
        if (request.title === '') {
            errors.push('عنوان نمیتواند خالی باشد!');
        }
        if (request.slug === '') {
            errors.push('نامک نمیتواند خالی باشد!');
        }
        if (request.content === '') {
            errors.push('محتوا نمیتواند خالی باشد!');
        }
        if (!authorIDs.includes(request.author_id)) {
            errors.push('یک نویسنده انتخاب کنید!');
        }
        if (!request.status) {
            errors.push('یک وضعیت انتخاب کنید!');
        }
        return errors;
    }

    remove(request) {
        const errors = [];
        const success = [];
        if (request.session.postRemoveSuccess) {
            success.push('مطلب مورد نظر با موفقیت حذف شد.');
        } else {
            errors.push('خطایی رخ داده است. مطلب مورد نظر حذف نشد.');
        }
        return { errors: errors, success: success }
    }
}

module.exports = Post;