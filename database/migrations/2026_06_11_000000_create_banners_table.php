<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->nullable();
            $table->string('title');
            $table->text('subtitle')->nullable();
            $table->string('image')->nullable();
            $table->string('cta_label')->nullable();
            $table->string('cta_link')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Seed the banners that were previously hardcoded on the home page,
        // so the carousel keeps working out of the box and the admin can edit them.
        DB::table('banners')->insert([
            [
                'eyebrow' => 'MarrakechNutrition',
                'title' => 'Votre nutrition sportive à Marrakech',
                'subtitle' => 'Compléments alimentaires et produits de nutrition sportive, livrés à domicile. Paiement à la livraison.',
                'image' => null,
                'cta_label' => 'Découvrir nos produits',
                'cta_link' => '/products',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'eyebrow' => 'Protéines',
                'title' => 'Boostez votre récupération',
                'subtitle' => 'Whey, isolat et protéines bio pour atteindre vos objectifs plus vite.',
                'image' => null,
                'cta_label' => 'Voir les protéines',
                'cta_link' => '/categories/proteines',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'eyebrow' => 'Pré-workout',
                'title' => 'Donnez le maximum à chaque séance',
                'subtitle' => 'Des compléments pré-entraînement pour plus d’énergie et de concentration.',
                'image' => null,
                'cta_label' => 'Voir le pré-workout',
                'cta_link' => '/categories/pre-workout',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
