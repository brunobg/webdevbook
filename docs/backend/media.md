# Media

Most applications need to handle media dynamically. Whether it's contents (product pictures), user avatars, picture posts, videos, it's a common feature. It requires files to be uploaded, processed (to validate the file integrity, resolution, possibly analyze contents, generate thumbnails) and be stored in a publicly accessible, but possibly restricted by user, location.

Laravel has a [filesystem abstraction](https://laravel.com/docs/8.x/filesystem). It includes functions to handle uploads and storage. But media upload and storage can become hard quickly. It's a vector for attacks, including denial of service. It's best to use libraries to handle it, but make sure to add checks to ensure files uploaded match what you expect, in terms of file type, size and contents.

A wonderful library to handle files is [Laravel-medialibrary](https://spatie.be/docs/laravel-medialibrary/v8/introduction). It is easy to use and handles association with models in a very simple and Laravel-like way.

[LighthousePHP also supports uploads, directly in GraphQl](https://lighthouse-php.com/3.1/guides/file-uploads.html).

## File upload

### With Laravel

The file is part of the `Request` object, and can be stored directly from it:

```php
    public function update(Request $request)
    {
        $path = $request->file('avatar')->store('avatars');

        return $path;
    }
```

You can also store it in a S3-like service, as we'll see below.

### With Laravel-medialibrary

You can associate the file directly to a model:

```php
$yourModel = YourModel::find(1);
$yourModel->addMediaFromRequest('image')->toMediaCollection('images');
```

It includes support for S3-like services as well, using Laravel's filesystem for that. It also includes several processing modules, such as converting images to several resolutions, optimizing images etc.

### In GraphQL with Lighthouse:

This is handed with a special scalar type, which you should declare in your schema:

```graphql
"Can be used as an argument to upload files using https://github.com/jaydenseric/graphql-multipart-request-spec"
scalar Upload
  @scalar(class: "Nuwave\\Lighthouse\\Schema\\Types\\Scalars\\Upload")
```

Once the scalar is added, you can add it to a mutation.

```graphql
type Mutation {
  "Upload a file that is publicly available."
  upload(file: Upload!): String
}
```

You process the file on your mutation callback. There you can do whatever you want with your file, including using Laravel-medialibrary.

```php
namespace App\GraphQL\Mutations;

class Upload
{
    /**
     * Upload a file, store it on the server and return the path.
     *
     * @param  mixed  $root
     * @param  array<string, mixed>  $args
     * @return string|null
     */
    public function resolve($root, array $args): ?string
    {
        /** @var \Illuminate\Http\UploadedFile $file */
        $file = $args['file'];

        // process the file/save it
        return $file->storePublicly('uploads');
    }
}
```

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
