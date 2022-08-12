<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => public_path('Uploads'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => public_path('Images'),
            'url' => env('APP_URL').'/public',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => 'AKIAZLC44ILQ5DWFKJSR',
            'secret' => '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',
            'region' => 'ap-south-1',
            'bucket' => 'oems-prod-s3-rd1',
            'scheme' => 'http' // to disable SSL verification on local development
            // 'driver' => 's3',
            // 'key' => env('AWS_ACCESS_KEY_ID'),
            // 'secret' => env('AWS_SECRET_ACCESS_KEY'),
            // 'region' => env('AWS_DEFAULT_REGION'),
            // 'bucket' => env('AWS_BUCKET'),
            // https://oems-prod-s3-rd1.s3.ap-south-1.amazonaws.com/Test+Upload+UCT+20220504/A1130113001/A1130113001-01.jpg
        ],
       
    ],

];
