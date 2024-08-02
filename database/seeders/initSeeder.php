<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class initSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('engineers')->insert([
            [
                'name' => Str::random(rand(5,15)),
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(rand(5,15)),
                'email' => 'test@2gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(rand(5,15)),
                'email' => 'test3@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);


        DB::table('companies')->insert([
            [
                'name' => Str::random(rand(5,15)),
                'address'=>"",
                'explain'=>"",
                'imgURL'=>"",
                'homepageURL'=>"",
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(rand(5,15)),
                'address'=>"",
                'explain'=>"",
                'imgURL'=>"",
                'homepageURL'=>"",
                'email' => 'test2@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(rand(5,15)),
                'address'=>"",
                'explain'=>"",
                'imgURL'=>"",
                'homepageURL'=>"",
                'email' => 'test3@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);


        DB::table('chats')->insert([
            [
                'company_id' => 1,
                'engineer_id' => 1,
                'type' => 'FromEngineerToCompany',
                'text' => Str::random(rand(10,20)),
            ],
            [
                'company_id' => 1,
                'engineer_id' => 1,
                'type' => 'FromEngineerToCompany',
                'text' => Str::random(rand(10,20)),
            ],
            [
                'company_id' => 1,
                'engineer_id' => 1,
                'type' => 'FromCompanyToEngineer',
                'text' => Str::random(rand(10,20)),
            ],
            [
                'company_id' => 2,
                'engineer_id' => 2,
                'type' => 'FromEngineerToCompany',
                'text' => Str::random(rand(10,20)),
            ],
            [
                'company_id' => 2,
                'engineer_id' => 2,
                'type' => 'FromEngineerToCompany',
                'text' => Str::random(rand(10,20)),
            ],
            [
                'company_id' => 2,
                'engineer_id' => 2,
                'type' => 'FromCompanyToEngineer',
                'text' => Str::random(rand(10,20)),
            ],
        ]);


        DB::table('portfolios')->insert([
            [
                'engineer_id' => 1,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 1,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 1,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
        ]);


        DB::table(('favorite__from__companies'))->insert([
            [
                'company_id' => 1,
                'engineer_id' => 1,
            ],
            [
                'company_id' => 2,
                'engineer_id' => 1,
            ],
            [
                'company_id' => 3,
                'engineer_id' => 1,
            ],
            [
                'company_id' => 1,
                'engineer_id' => 2,
            ],
            [
                'company_id' => 1,
                'engineer_id' => 3,
            ],
        ]);
    }
}
