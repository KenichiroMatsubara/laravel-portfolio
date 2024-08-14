<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Nette\Utils\Random;

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
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'email' => 'test@2gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'email' => 'test3@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);


        DB::table('engineer_profiles')->insert([
            [
                "engineer_id" => 1,
                "name" => Str::random(rand(5,10)),
                "work_experience" => rand(0,10),
            ],
            [
                "engineer_id" => 2,
                "name" => Str::random(rand(5,10)),
                "work_experience" => rand(0,10),
            ],
            [
                "engineer_id" => 3,
                "name" => Str::random(rand(5,10)),
                "work_experience" => rand(0,10),
            ],
        ]);


        DB::table('companies')->insert([
            [
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'email' => 'test2@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'email' => 'test3@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);


        DB::table('company_profiles')->insert([
            [
                "company_id" => 1,
                "name" => Str::random(rand(5,10)),
                "address" => Str::createRandomStringsNormally(),
                "explain" => Str::createRandomStringsNormally(),
                "homepageURL" => "america",
                "imgURL" => "america",
            ],
            [
                "company_id" => 2,
                "name" => Str::random(rand(5,10)),
                "address" => Str::createRandomStringsNormally(),
                "explain" => Str::createRandomStringsNormally(),
                "homepageURL" => "america",
                "imgURL" => "america",
            ],
            [
                "company_id" => 3,
                "name" => Str::random(rand(5,10)),
                "address" => Str::createRandomStringsNormally(),
                "explain" => Str::createRandomStringsNormally(),
                "homepageURL" => "america",
                "imgURL" => "america",
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
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 1,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 1,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 2,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
            [
                'engineer_id' => 3,
                'name' => Str::random(rand(5,10)),
                'explain' => Str::random(rand(50,100)),
                'githubURL' => Str::random(10),
                'deployURL' => Str::random(10),
            ],
        ]);

        DB::table('portfolio__using__stacks')->insert([
            [
                'portfolio_id' => 1,
                'stack' => "laravel"
            ],
            [
                'portfolio_id' => 1,
                'stack' => "react"
            ],
            [
                'portfolio_id' => 1,
                'stack' => "heroku"
            ],
            [
                'portfolio_id' => 2,
                'stack' => "django"
            ],
            [
                'portfolio_id' => 2,
                'stack' => "react"
            ],
            [
                'portfolio_id' => 2,
                'stack' => "heroku"
            ],
            [
                'portfolio_id' => 3,
                'stack' => "nodejs"
            ],
            [
                'portfolio_id' => 3,
                'stack' => "react"
            ],
            [
                'portfolio_id' => 3,
                'stack' => "heroku"
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
