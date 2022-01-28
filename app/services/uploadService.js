exports.uploadPostThumbnail = (thumbnail) => {
    const fileExtention = thumbnail.name.split('.').pop();
    const newName = thumbnail.md5;
    thumbnail.mv(`${process.env.PWD}/public/upload/thumbnails/${newName}.${fileExtention}`, async(err) => {
        if (err) {
            console.log(err);
            return false;
        }
    });
}