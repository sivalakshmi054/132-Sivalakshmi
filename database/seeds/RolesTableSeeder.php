<?php

use Illuminate\Database\Seeder;
use SchoolManagement\Models\Role;
    
class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
     public function run()
    {
        Role::insert([
            ['name'=>'Admin'],
            ['name'=>'Receiptionist'],
            ['name'=>'Manager'],
            ['name'=>'CEO']
        ]);
    }
}
