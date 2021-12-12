class Post {
    create(request) {
        //success
        if (request.postCreated) {
            const success = ['مطلب با موفقیت ایجاد شد.'];
            return success;
        }

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