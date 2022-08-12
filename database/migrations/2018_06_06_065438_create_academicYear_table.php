<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAcademicYearTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academicYear', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('AcademicYear');
            $table->integer('FromYearId')->unsigned();
            $table->foreign('FromYearId')->references('Id')->on('YearMaster'); 
            $table->integer('ToYearId')->unsigned();
            $table->foreign('ToYearId')->references('Id')->on('YearMaster'); 
            $table->string('Description',250);
            $table->boolean('IsAcademicTest');
            $table->integer('IsActive')->default(1);
            $table->integer('ModifiedUser_Id')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academicYear');
    }
}
