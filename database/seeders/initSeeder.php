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
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(10),
                'email' => 'test@2gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
            [
                'name' => Str::random(10),
                'email' => 'test3@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);
        DB::table('companies')->insert([
            [
                'name' => Str::random(10),
                'email' => 'test1@gmail.com',
                'password' => p_hash(hash('sha256','abcdef')),
            ],
        ]);
    }
}
