# Media

Most applications need to handle media dynamically. Whether it's contents (product pictures), user avatars, picture posts, videos, it's a common feature. It requires files to be uploaded, processed (to validate the file integrity, resolution, possibly analyze contents, generate thumbnails) and be stored in a publicly accessible, but possibly restricted by user, location.

## File upload

TODO

## Processing files

TODO

## Storage

The most traditional way to store files is on the server disk. Object storage, with services such as AWS S3 or similar ones are also possible. They are carefree -- you don't worry about disk limits, storage, backups, availability, scalability; as long as you pay the bill, it's fine. Most of them follow the same API.

Laravel offers a [file storage system](https://laravel.com/docs/8.x/filesystem) that can use different adapters. The local driver, which is the default, uses a local disk for storage. But you can use the S3 driver for object storage. Laravel abstracts the access with a simple API.

## Restricting access

Remember than any files in the `public` directory are accessible by anyone with its URL. If you need to restrict access there by user there are a few solutions.

One is to store data in a folder that is not accessible publicly, and create an endpoint to serve the files, such as `/files/$id`. Then you can implement a controller for that route, which checks policy through middleware. The controller endpoint will be more or less like this:

```php
public function file($file_url) {
    return Response::make(Storage::disk('mydisk')->get($file_url));
}
```

If you are using external block storage the same idea works, but instead of serving the file, just redirect it to a temporary URL

```php
public function fule($file_url){
    $url = Storage::disk('s3')->temporaryUrl($file_url, now()->addMinutes(5));
    return redirect($url);
);
```
