<?php

use Illuminate\Database\Seeder;
use SchoolManagement\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        User::create([
            'role_id'=>1,
            'active'=>1,
            'name'=>'123',
            'username'=>'123',
            'email'=>'123@gmail.com',
            'password'=>bcrypt('123'),
            'remember_token'=>str_random(10),
        ]);
        User::create([
            'role_id'=>2,
            'active'=>1,
            'name'=>'test',
            'username'=>'test',
            'email'=>'test@gmail.com',
            'password'=>bcrypt('test'),
            'remember_token'=>str_random(10),
        ]);
        User::create([
            'role_id'=>3,
            'active'=>1,
            'name'=>'sms',
            'username'=>'sms',
            'email'=>'sms@gmail.com',
            'password'=>bcrypt('sms'),
            'remember_token'=>str_random(10),
        ]);
    }
}